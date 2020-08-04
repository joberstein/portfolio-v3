package joberstein.portfolio.service;

import joberstein.portfolio.model.VerifyCaptchaRequest;
import joberstein.portfolio.model.VerifyCaptchaResponse;
import kong.unirest.HttpRequestWithBody;
import kong.unirest.HttpResponse;
import kong.unirest.UnirestInstance;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class CaptchaVerificationClientTest {

    @InjectMocks
    private CaptchaVerificationClient captchaVerificationClient;

    @Mock
    private UnirestInstance unirestClient;

    @Mock
    private HttpResponse<VerifyCaptchaResponse> verifyCaptchaResponse;
    
    private final VerifyCaptchaRequest CAPTCHA_REQUEST = VerifyCaptchaRequest.builder()
        .response("aaa")
        .secret("bbb")
        .build();

    @Test
    public void testVerifyCaptcha_succeeds() {
        var response = VerifyCaptchaResponse.builder().success(true).build();
        mockVerificationRequest(response);

        assertTrue(captchaVerificationClient.verify(CAPTCHA_REQUEST).isSuccess());
    }

    @Test
    public void testVerifyCaptcha_fails() {
        var response = VerifyCaptchaResponse.builder().build();
        mockVerificationRequest(response);
        
        assertFalse(captchaVerificationClient.verify(CAPTCHA_REQUEST).isSuccess());
    }

    private void mockVerificationRequest(VerifyCaptchaResponse expectedResponse) {
        HttpRequestWithBody mockRequest = mock(HttpRequestWithBody.class);
        when(unirestClient.post(anyString())).thenReturn(mockRequest);
        when(mockRequest.header(anyString(), anyString())).thenReturn(mockRequest);
        when(mockRequest.queryString(anyMap())).thenReturn(mockRequest);
        when(mockRequest.asObject(VerifyCaptchaResponse.class)).thenReturn(verifyCaptchaResponse);
        when(verifyCaptchaResponse.getBody()).thenReturn(expectedResponse);
    }
}
