package joberstein.portfolio.apiGateway;

import joberstein.portfolio.BaseStack;
import joberstein.portfolio.apiGateway.methods.sendMessage.SendMessageIntegrationBuilder;
import joberstein.portfolio.apiGateway.methods.sendMessage.SendMessageOptionsBuilder;
import joberstein.portfolio.lambda.SendEmailLambda;
import software.amazon.awscdk.core.Construct;
import software.amazon.awscdk.core.Environment;
import software.amazon.awscdk.core.StackProps;
import software.amazon.awscdk.services.apigateway.*;

import java.util.List;
import java.util.Map;

import static javax.ws.rs.HttpMethod.OPTIONS;
import static javax.ws.rs.HttpMethod.POST;
import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import static javax.ws.rs.core.HttpHeaders.CONTENT_TYPE;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

public class MessagesApi extends BaseStack<RestApi> {

    private static final String API_NAME = "Messages API";
    private static final String API_DESCRIPTION = "Allows messages to be sent out to a recipient.";
    private static final String MESSAGES_RESOURCE = "messages";
    private static final String STAGE_NAME = "production";

    private static final String X_AMZ_DATE = "X-Amz-Date";
    private static final String X_API_KEY = "X-Api-Key";
    private static final String X_AMZ_SECURITY_TOKEN = "X-Amz-Security-Token";
    
    private static final Map<String, String> REQUEST_TEMPLATES = Map.of(APPLICATION_JSON, "/applicationJson.vtl");

    private final SendMessageIntegrationBuilder lambdaIntegrationBuilder;

    public MessagesApi(Construct scope, Environment environment, SendEmailLambda sendEmailLambda) {
        super(scope, "messagesApi", StackProps.builder()
            .env(environment)
            .build());

        this.addDependency(sendEmailLambda);

        var lambda = sendEmailLambda.getInstance();
        var requestTemplateBuilder = new RequestTemplateBuilder(REQUEST_TEMPLATES);
        var requestTemplates = requestTemplateBuilder.build();
        this.lambdaIntegrationBuilder = new SendMessageIntegrationBuilder(lambda, requestTemplates);
        
        this.init();
    }
    
    public static String responseHeaderKey(String header) {
        return "method.response.header." + header;
    }

    protected RestApi build() {
        RestApi api = buildApi();
        
        var messagesResource = api.getRoot().addResource(MESSAGES_RESOURCE);
        messagesResource.addCorsPreflight(buildCorsOptions());
        
        var sendMessageOptions = new SendMessageOptionsBuilder(api).build();
        messagesResource.addMethod(POST, lambdaIntegrationBuilder.build(), sendMessageOptions);
        
        return api;
    }

    private RestApi buildApi() {
        return RestApi.Builder.create(this, "messagesRestApi")
            .restApiName(API_NAME)
            .description(API_DESCRIPTION)
            .endpointTypes(List.of(EndpointType.EDGE))
            .deployOptions(buildStageOptions())
            .retainDeployments(true)
            .cloudWatchRole(false)
            .build();
    }

    private StageOptions buildStageOptions() {
        return StageOptions.builder()
            .stageName(STAGE_NAME)
            .throttlingRateLimit(30)
            .throttlingBurstLimit(15)
            .loggingLevel(MethodLoggingLevel.OFF)
            .build();
    }

    private CorsOptions buildCorsOptions() {
        return CorsOptions.builder()
            .allowMethods(List.of(POST, OPTIONS))
            .allowHeaders(List.of(CONTENT_TYPE, AUTHORIZATION, X_AMZ_DATE, X_API_KEY, X_AMZ_SECURITY_TOKEN))
            .allowOrigins(List.of("*"))
            .build();
    }
}
