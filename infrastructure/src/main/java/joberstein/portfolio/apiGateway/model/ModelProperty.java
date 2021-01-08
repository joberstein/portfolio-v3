package joberstein.portfolio.apiGateway.model;

import java.util.Map;

import lombok.Builder;
import lombok.Getter;
import software.amazon.awscdk.services.apigateway.JsonSchema;
import software.amazon.awscdk.services.apigateway.JsonSchemaType;

@Getter
@Builder
class ModelProperty {

    private String id;
    private String title;
    private JsonSchemaType type;
    private String pattern;
    private Object defaultValue;

    Map.Entry<String, JsonSchema> toMapEntry() {
        var propertyValue = JsonSchema.builder()
            .title(this.title)
            .type(this.type)
            .pattern(this.pattern)
            .defaultValue(this.defaultValue)
            .build();

        return Map.entry(this.id, propertyValue);
    }
    
}
