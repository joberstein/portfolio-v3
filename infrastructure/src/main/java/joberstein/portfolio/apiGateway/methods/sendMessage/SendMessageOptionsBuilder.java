package joberstein.portfolio.apiGateway.methods.sendMessage;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.ws.rs.core.Response.Status;

import static com.thetransactioncompany.cors.HeaderName.ACCESS_CONTROL_ALLOW_ORIGIN;
import static joberstein.portfolio.apiGateway.MessagesApi.responseHeaderKey;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.Response.Status.OK;
import static javax.ws.rs.core.Response.Status.BAD_REQUEST;
import static javax.ws.rs.core.Response.Status.FORBIDDEN;
import static javax.ws.rs.core.Response.Status.INTERNAL_SERVER_ERROR;

import joberstein.portfolio.apiGateway.model.SendMessageRequest;
import joberstein.portfolio.apiGateway.model.SendMessageResponse;
import joberstein.portfolio.apiGateway.model.ModelResource;
import lombok.AllArgsConstructor;
import software.amazon.awscdk.services.apigateway.AuthorizationType;
import software.amazon.awscdk.services.apigateway.IModel;
import software.amazon.awscdk.services.apigateway.MethodOptions;
import software.amazon.awscdk.services.apigateway.MethodResponse;
import software.amazon.awscdk.services.apigateway.Model;
import software.amazon.awscdk.services.apigateway.RequestValidatorOptions;
import software.amazon.awscdk.services.apigateway.RestApi;

@AllArgsConstructor
public class SendMessageOptionsBuilder {
    
    private final Map<String, Boolean> METHOD_RESPONSE_HEADERS = Map.ofEntries(
        Map.entry(responseHeaderKey(ACCESS_CONTROL_ALLOW_ORIGIN), true));

    private final RestApi api;

    public MethodOptions build() {
        return MethodOptions.builder()
            .authorizationType(AuthorizationType.NONE)
            .apiKeyRequired(false)
            .requestModels(Map.ofEntries(
                Map.entry(APPLICATION_JSON, addModel(api, new SendMessageRequest()))
            ))
            .requestValidatorOptions(buildRequestValidatorOptions())
            .methodResponses(buildMethodResponses())
            .build();
    }

    private RequestValidatorOptions buildRequestValidatorOptions() {
        return RequestValidatorOptions.builder()
            .validateRequestBody(true)
            .build();
    }

    private List<MethodResponse> buildMethodResponses() {
        return Stream.of(OK, BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR)
            .map(status -> MethodResponse.builder()
                .statusCode(Integer.toString(status.getStatusCode()))
                .responseParameters(METHOD_RESPONSE_HEADERS)
                .responseModels(Map.ofEntries(
                    Map.entry(APPLICATION_JSON, getResponseModel(status))))
                .build())
            .collect(Collectors.toList());
    }

    private IModel getResponseModel(Status status) {
        switch (status) {
            case OK:
                return addModel(api, new SendMessageResponse());
            case BAD_REQUEST:
            case FORBIDDEN:
            case INTERNAL_SERVER_ERROR:
                return Model.ERROR_MODEL;
            default:
                return Model.EMPTY_MODEL;
        }
    }
    
    private Model addModel(RestApi api, ModelResource model) {
        return api.addModel(model.getId(), model.buildModelOptions());
    }
}
