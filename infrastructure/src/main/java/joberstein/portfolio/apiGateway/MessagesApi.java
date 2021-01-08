package joberstein.portfolio.apiGateway;

import java.util.List;
import java.util.Map;

import static javax.ws.rs.HttpMethod.POST;
import static javax.ws.rs.HttpMethod.OPTIONS;
import static javax.ws.rs.core.HttpHeaders.CONTENT_TYPE;
import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import joberstein.portfolio.BaseStack;
import joberstein.portfolio.apiGateway.methods.sendMessage.SendMessageIntegrationBuilder;
import joberstein.portfolio.apiGateway.methods.sendMessage.SendMessageOptionsBuilder;
import joberstein.portfolio.lambda.SendEmailLambda;
import software.amazon.awscdk.core.Construct;
import software.amazon.awscdk.core.Environment;
import software.amazon.awscdk.core.StackProps;
import software.amazon.awscdk.services.apigateway.CorsOptions;
import software.amazon.awscdk.services.apigateway.EndpointType;
import software.amazon.awscdk.services.apigateway.MethodLoggingLevel;
import software.amazon.awscdk.services.apigateway.RestApi;
import software.amazon.awscdk.services.apigateway.StageOptions;

public class MessagesApi extends BaseStack<RestApi> {

    private final String MESSAGES_RESOURCE = "messages";
    
    private final Map<String, String> REQUEST_TEMPLATES = Map.ofEntries(
        Map.entry(APPLICATION_JSON, "/applicationJson.vtl"));

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
            .restApiName("Messages")
            .description("Allows messages to be sent out to a recipient.")
            .endpointTypes(List.of(EndpointType.EDGE))
            .deployOptions(buildStageOptions())
            .retainDeployments(true)
            .cloudWatchRole(false)
            .build();
    }

    private StageOptions buildStageOptions() {
        return StageOptions.builder()
            .stageName("production")
            .throttlingRateLimit(30)
            .throttlingBurstLimit(15)
            .loggingLevel(MethodLoggingLevel.OFF)
            .build();
    }

    private CorsOptions buildCorsOptions() {
        return CorsOptions.builder()
            .allowMethods(List.of(POST, OPTIONS))
            .allowHeaders(List.of(CONTENT_TYPE, AUTHORIZATION, "X-Amz-Date", "X-Api-Key", "X-Amz-Security-Token"))
            .allowOrigins(List.of("*"))
            .build();
    }
}
