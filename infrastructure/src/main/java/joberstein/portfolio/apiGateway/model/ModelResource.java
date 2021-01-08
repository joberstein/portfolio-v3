package joberstein.portfolio.apiGateway.model;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Getter;
import software.amazon.awscdk.services.apigateway.JsonSchema;
import software.amazon.awscdk.services.apigateway.JsonSchemaVersion;
import software.amazon.awscdk.services.apigateway.ModelOptions;

@AllArgsConstructor
public abstract class ModelResource {

    @Getter
    private String id;
    
    private String name;
    private String description;

    public ModelOptions buildModelOptions() {
        return ModelOptions.builder()
            .modelName(this.name)
            .description(this.description)
            .contentType(APPLICATION_JSON)
            .schema(buildSchema())
            .build();
    }

    protected abstract JsonSchema buildSchema();

    protected JsonSchema.Builder getSchemaBuilder(String title) {
        return JsonSchema.builder()
            .schema(JsonSchemaVersion.DRAFT4)
            .title(title);
    }

    protected Map<String, JsonSchema> buildProperties(ModelProperty... properties) {
        return Arrays.stream(properties)
            .map(ModelProperty::toMapEntry)
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    protected List<String> requiredProperties(ModelProperty... properties) {
        return Arrays.stream(properties)
            .map(ModelProperty::getId)
            .collect(Collectors.toList());
    }
}
