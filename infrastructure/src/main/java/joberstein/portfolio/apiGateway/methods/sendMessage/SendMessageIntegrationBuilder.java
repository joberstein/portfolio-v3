package joberstein.portfolio.apiGateway.methods.sendMessage;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;

import static com.thetransactioncompany.cors.HeaderName.ACCESS_CONTROL_ALLOW_ORIGIN;
import static joberstein.portfolio.apiGateway.MessagesApi.responseHeaderKey;
import static org.apache.http.HttpStatus.SC_OK;
import static org.apache.http.HttpStatus.SC_BAD_REQUEST;
import static org.apache.http.HttpStatus.SC_FORBIDDEN;
import static org.apache.http.HttpStatus.SC_INTERNAL_SERVER_ERROR;

import software.amazon.awscdk.services.apigateway.IntegrationResponse;
import software.amazon.awscdk.services.apigateway.LambdaIntegration;
import software.amazon.awscdk.services.apigateway.PassthroughBehavior;
import software.amazon.awscdk.services.lambda.Function;

@AllArgsConstructor
public class SendMessageIntegrationBuilder {
    
    private final Map<String, String> INTEGRATION_RESPONSE_HEADERS = Map.ofEntries(
        Map.entry(responseHeaderKey(ACCESS_CONTROL_ALLOW_ORIGIN), "'*'"));

    private final Map<Integer, String> INTEGRATION_RESPONSES = Map.ofEntries(
        Map.entry(SC_OK, ""),
        Map.entry(SC_BAD_REQUEST, ".*Status Code: 4\\d{2}.*"),
        Map.entry(SC_FORBIDDEN, ".*Captcha validation failed.*"),
        Map.entry(SC_INTERNAL_SERVER_ERROR, ".*((Status Code: 5\\d{2})|Null).*"));

    private final Function lambdaFunction;
    private final Map<String, String> requestTemplates;

    public LambdaIntegration build() {
        return LambdaIntegration.Builder.create(this.lambdaFunction)
            .requestTemplates(this.requestTemplates)
            .passthroughBehavior(PassthroughBehavior.WHEN_NO_TEMPLATES)
            .integrationResponses(buildIntegrationResponses())
            .proxy(false)
            .build();
    }

    private List<IntegrationResponse> buildIntegrationResponses() {
        return INTEGRATION_RESPONSES.entrySet().stream()
            .map(entry -> IntegrationResponse.builder()
                .statusCode(Integer.toString(entry.getKey()))
                .selectionPattern(entry.getValue())
                .responseParameters(INTEGRATION_RESPONSE_HEADERS)
                .build())
            .collect(Collectors.toList());
    }
}