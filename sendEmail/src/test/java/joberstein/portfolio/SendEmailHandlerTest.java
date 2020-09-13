package joberstein.portfolio;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.model.SendEmailRequest;
import com.amazonaws.services.simpleemail.model.SendEmailResult;

import joberstein.portfolio.configuration.AppConfig;
import joberstein.portfolio.model.ContactRequest;
import joberstein.portfolio.model.ContactResponse;
import joberstein.portfolio.model.VerifyCaptchaRequest;
import joberstein.portfolio.model.VerifyCaptchaResponse;
import joberstein.portfolio.service.CaptchaVerificationService;
import joberstein.portfolio.http.HttpClient;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class SendEmailHandlerTest {

    @Mock
    private Context context;

    @Mock
    private LambdaLogger logger;

    @Mock
    private AmazonSimpleEmailService ses;

    @Mock
    private CaptchaVerificationService captchaVerificationService;

    @Mock
    private HttpClient httpClient;

    @Mock
    private AppConfig config;

    @InjectMocks
    private SendEmailHandler application;

    private final String CAPTCHA_TOKEN = "captcha_token";
    private final String MESSAGE_ID = "sent-message-id";
    private final ContactRequest CONTACT_REQUEST = ContactRequest.builder()
        .from("From")
        .subject("Subject")
        .replyToAddress("test@test.com")
        .body("Body")
        .captcha(CAPTCHA_TOKEN)
        .build();

    @Before
    public void setup() {
        VerifyCaptchaResponse captchaResponse = VerifyCaptchaResponse.builder().success(true).build();

        when(config.getCaptchaVerificationService(logger)).thenReturn(captchaVerificationService);
        when(captchaVerificationService.verify(any(VerifyCaptchaRequest.class))).thenReturn(captchaResponse);
        when(captchaVerificationService.getHttpClient()).thenReturn(httpClient);
        doNothing().when(httpClient).close();

        when(config.getSimpleEmailService()).thenReturn(ses);
        when(ses.sendEmail(any(SendEmailRequest.class))).thenReturn(new SendEmailResult().withMessageId(MESSAGE_ID));

        when(context.getLogger()).thenReturn(logger);
    }

    @Test
    public void testHandleRequest_invalidCaptcha() {
        VerifyCaptchaResponse captchaResponse = VerifyCaptchaResponse.builder().success(false).build();
        when(captchaVerificationService.verify(any(VerifyCaptchaRequest.class))).thenReturn(captchaResponse);

        try {
            application.handleRequest(CONTACT_REQUEST, context);
        } catch (RuntimeException e) {
            assertEquals("Captcha validation failed.", e.getMessage());
            verify(captchaVerificationService).verify(any(VerifyCaptchaRequest.class));
            verifyZeroInteractions(ses);
            return;
        }

        fail("Captcha validation error not thrown");
    }

    @Test
    public void testHandleRequest_validCaptcha() {
        ContactResponse response = application.handleRequest(CONTACT_REQUEST, context);
        assertEquals(MESSAGE_ID, response.getResultId());
        verify(captchaVerificationService).verify(any(VerifyCaptchaRequest.class));
        verify(ses).sendEmail(any(SendEmailRequest.class));
    }

    @Test
    public void testHandleRequest_sendingEmailFails() {
        when(ses.sendEmail(any(SendEmailRequest.class))).thenThrow(new RuntimeException("Send failed."));

        try {
            application.handleRequest(CONTACT_REQUEST, context);
        } catch(RuntimeException e) {
            assertEquals("Send failed.", e.getMessage());
            verify(captchaVerificationService).verify(any(VerifyCaptchaRequest.class));
            verify(ses).sendEmail(any(SendEmailRequest.class));
            return;
        }

        fail("Email send error not thrown");
    }
}
