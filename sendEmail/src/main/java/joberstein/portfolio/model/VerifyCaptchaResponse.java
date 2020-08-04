package joberstein.portfolio.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import lombok.*;

import java.util.Set;

@Data
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonDeserialize(builder = VerifyCaptchaResponse.VerifyCaptchaResponseBuilder.class)
public class VerifyCaptchaResponse {
    private boolean success;
    private String hostname;

    @JsonProperty("challenge_ts")
    private String challengeTs;

    @JsonProperty("error-codes")
    private Set<String> errorCodes;

    @JsonPOJOBuilder(withPrefix = "")
    public static class VerifyCaptchaResponseBuilder {}
}
