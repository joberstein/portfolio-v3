package joberstein.portfolio.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class VerifyCaptchaResponse {
    private boolean success;
    private String hostname;

    @JsonProperty("challenge_ts")
    private String challengeTs;

    @JsonProperty("error-codes")
    private Set<String> errorCodes;
}
