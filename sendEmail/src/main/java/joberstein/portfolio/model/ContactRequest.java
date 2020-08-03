package joberstein.portfolio.model;

import com.amazonaws.services.simpleemail.model.*;
import lombok.*;
import org.apache.commons.lang3.StringEscapeUtils;

import java.nio.charset.StandardCharsets;

@Data
@Builder
@AllArgsConstructor
public class ContactRequest {

    private String from;
    private String replyToAddress;
    private String subject;
    private String body;
    private String captcha;
    private String ipAddress;

    public VerifyCaptchaRequest toCaptchaRequest() {
        return VerifyCaptchaRequest.builder()
            .response(this.captcha)
            .secret(System.getenv("GOOGLE_CAPTCHA_KEY"))
            .remoteIp(this.ipAddress)
            .build();
    }

    public SendEmailRequest toSendEmailRequest(String sourceEmail, String destinationEmail, String messageTemplate) {
        var subject = new Content()
            .withCharset(StandardCharsets.UTF_8.name())
            .withData(StringEscapeUtils.escapeEcmaScript(this.subject));

        var emailHtml = new Content()
            .withCharset(StandardCharsets.UTF_8.name())
            .withData(String.format(
                messageTemplate,
                StringEscapeUtils.escapeEcmaScript(this.replyToAddress),
                StringEscapeUtils.escapeEcmaScript(this.from.isEmpty() ? this.replyToAddress : this.from),
                StringEscapeUtils.escapeEcmaScript(this.body)));

        var body = new Body()
            .withHtml(emailHtml);

        var message = new Message()
            .withSubject(subject)
            .withBody(body);
            
        var destination = new Destination()
            .withToAddresses(destinationEmail);

        return new SendEmailRequest()
            .withSource(sourceEmail)
            .withMessage(message)
            .withDestination(destination);
    }
}