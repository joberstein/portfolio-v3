package joberstein.portfolio.apiGateway;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class RequestTemplateBuilder {

    private static final String BASE_RESOURCES_PATH = "apiGateway/requestTemplates";

    private final Map<String, String> requestTemplates;
    
    RequestTemplateBuilder(Map<String, String> templates) {
        this.requestTemplates = templates.entrySet()
            .stream()
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                e -> BASE_RESOURCES_PATH + e.getValue()));
    }
        
    Map<String, String> build() {
        Map<String, String> requestTemplateMap = new HashMap<>();

        for (String contentType : this.requestTemplates.keySet()) {
            String templatePath = this.requestTemplates.get(contentType);
            var inputStream = this.getClass().getClassLoader().getResourceAsStream(templatePath.toString());
            var streamReader = new BufferedReader(new InputStreamReader(inputStream));
            var requestTemplate = streamReader.lines().collect(Collectors.joining("\n"));

            requestTemplateMap.put(contentType, requestTemplate);
        }

        return requestTemplateMap;
    }
}
