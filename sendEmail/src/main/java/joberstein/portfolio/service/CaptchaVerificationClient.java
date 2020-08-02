package joberstein.portfolio.service;

import joberstein.portfolio.model.VerifyCaptchaRequest;
import joberstein.portfolio.model.VerifyCaptchaResponse;
import kong.unirest.UnirestInstance;
import lombok.AllArgsConstructor;

import java.util.Map;

import org.apache.http.HttpHeaders;

@AllArgsConstructor
public class CaptchaVerificationClient {
    private final String CAPTCHA_VERIFICATION_URL = "https://www.google.com/recaptcha/api/siteverify";
    
    private UnirestInstance unirestClient;

    public boolean verify(VerifyCaptchaRequest request) {
        return unirestClient.post(CAPTCHA_VERIFICATION_URL)
            .header(HttpHeaders.CONTENT_TYPE, "application/json")
            .queryString(Map.of(
                "response", request.getResponse(),
                "secret", request.getSecret()))
            .asObject(VerifyCaptchaResponse.class)
            .getBody()
            .isSuccess();
    }

    public void close() {
        unirestClient.shutDown();
    }
}
