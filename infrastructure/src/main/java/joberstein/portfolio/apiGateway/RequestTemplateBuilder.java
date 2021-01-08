package joberstein.portfolio.apiGateway;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.http.entity.ContentType;

public class RequestTemplateBuilder {
    
    private final Map<ContentType, String> requestTemplates;
    
    RequestTemplateBuilder(Map<ContentType, String> templates) {
        this.requestTemplates = templates.entrySet()
            .stream()
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                e -> "apiGateway/requestTemplates/" + e.getValue()));
    }
        
    Map<String, String> build() {
        Map<String, String> requestTemplateMap = new HashMap<>();

        for (ContentType contentType : this.requestTemplates.keySet()) {
            String templatePath = this.requestTemplates.get(contentType);
            var inputStream = this.getClass().getClassLoader().getResourceAsStream(templatePath.toString());
            var streamReader = new BufferedReader(new InputStreamReader(inputStream));
            var requestTemplate = streamReader.lines().collect(Collectors.joining("\n"));

            requestTemplateMap.put(contentType.getMimeType(), requestTemplate);
        }

        return requestTemplateMap;
    }
}
