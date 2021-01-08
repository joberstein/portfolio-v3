package joberstein.portfolio.apiGateway.model;

import software.amazon.awscdk.services.apigateway.JsonSchema;
import software.amazon.awscdk.services.apigateway.JsonSchemaType;

public class SendMessageRequest extends ModelResource {

    public SendMessageRequest() {
        super("sendMessageRequestId", "MessageRequest", "Request for the 'messages' POST endpoint");
    }
    
    private final ModelProperty FROM = ModelProperty.builder()
        .id("from")
        .title("From")
        .type(JsonSchemaType.STRING)
        .pattern("^(.*)$")
        .defaultValue("")
        .build();

    private final ModelProperty REPLY_TO = ModelProperty.builder()
        .id("replyToAddress")
        .title("Reply-To Address")
        .type(JsonSchemaType.STRING)
        .pattern("^(.*)$")
        .defaultValue("")
        .build();

    private final ModelProperty SUBJECT = ModelProperty.builder()
        .id("subject")
        .title("Subject")
        .type(JsonSchemaType.STRING)
        .pattern("^(.*)$")
        .defaultValue("")
        .build();

    private final ModelProperty BODY = ModelProperty.builder()
        .id("body")
        .title("Body")
        .type(JsonSchemaType.STRING)
        .pattern("^(.*)$")
        .defaultValue("")
        .build();

    private final ModelProperty CAPTCHA = ModelProperty.builder()
        .id("captcha")
        .title("Captcha")
        .type(JsonSchemaType.STRING)
        .pattern("^(.*)$")
        .defaultValue("")
        .build();
    
    protected JsonSchema buildSchema() {
        return super.getSchemaBuilder("The Message Request Schema")
            .type(JsonSchemaType.OBJECT)
            .properties(buildProperties(FROM, REPLY_TO, SUBJECT, BODY, CAPTCHA))
            .required(requiredProperties(REPLY_TO, BODY))
            .build();
    }
}
