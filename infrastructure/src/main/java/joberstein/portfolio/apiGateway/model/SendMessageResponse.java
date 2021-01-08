package joberstein.portfolio.apiGateway.model;

import software.amazon.awscdk.services.apigateway.JsonSchema;
import software.amazon.awscdk.services.apigateway.JsonSchemaType;

public class SendMessageResponse extends ModelResource {

    public SendMessageResponse() {
        super("sendMessageResponseId", "MessageResponse", "Response for the 'messages' POST endpoint");
    }
    
    private final ModelProperty RESULT_ID = ModelProperty.builder()
        .id("resultId")
        .title("Result Id")
        .type(JsonSchemaType.STRING)
        .pattern("^(.*)$")
        .build();
    
    protected JsonSchema buildSchema() {
        return super.getSchemaBuilder("The Message Response Schema")
            .type(JsonSchemaType.OBJECT)
            .properties(buildProperties(RESULT_ID))
            .required(requiredProperties(RESULT_ID))
            .build();
    }
}
