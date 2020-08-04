package joberstein.portfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VerifyCaptchaRequest {
    private String secret;
    private String response;

    @JsonProperty("remoteip")
    private String remoteIp;
}
