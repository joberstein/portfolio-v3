package joberstein.portfolio;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;

import joberstein.portfolio.configuration.AppConfig;
import joberstein.portfolio.model.ContactRequest;
import joberstein.portfolio.model.ContactResponse;
import joberstein.portfolio.service.CaptchaVerificationClient;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PACKAGE)
public class SendEmailHandler implements RequestHandler<ContactRequest, ContactResponse> {
    private final static String SOURCE_EMAIL = "portfolio@jesseoberstein.com";
    private final static String DESTINATION_EMAIL = "joberstein12@gmail.com";
    private final static String MESSAGE_HTML_TEMPLATE = 
        "<html>" +
            "<body>" +
                "<h3>" +
                    "<a href='mailto:%s'>%s</a> sent you a message using the contact form on your portfolio website." +
                "</h3>" +
                "<p>Here's the message they sent you:</p>" +
                "<p>%s</p>" +
            "</body>" +
        "</html>";

    private final AppConfig config;

    public SendEmailHandler() {
        config = AppConfig.getInstance();
    }

    @Override
    public ContactResponse handleRequest(ContactRequest contactRequest, Context context) {
        CaptchaVerificationClient captchaVerificationClient = config.getCaptchaVerificationClient();
        var captchaRequest = contactRequest.toCaptchaRequest();
        boolean isCaptchaValid = captchaVerificationClient.verify(captchaRequest);
        captchaVerificationClient.close();

        if (!isCaptchaValid) {
            throw new RuntimeException("Captcha validation failed.");
        }

        AmazonSimpleEmailService ses = config.getSimpleEmailService();
        var emailRequest = contactRequest.toSendEmailRequest(SOURCE_EMAIL, DESTINATION_EMAIL, MESSAGE_HTML_TEMPLATE);
        var result = ses.sendEmail(emailRequest);
        
        return new ContactResponse(result.getMessageId());
    }
}