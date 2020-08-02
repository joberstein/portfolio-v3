package joberstein.portfolio.configuration;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import kong.unirest.Unirest;
import kong.unirest.UnirestInstance;
import kong.unirest.jackson.JacksonObjectMapper;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import joberstein.portfolio.service.CaptchaVerificationClient;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AppConfig {
    private final static Regions SES_REGION = Regions.US_EAST_1;
    
    private static AppConfig instance;
    private AmazonSimpleEmailService simpleEmailService;
    private CaptchaVerificationClient captchaVerificationClient;
    private UnirestInstance unirestInstance;

    public static AppConfig getInstance() {
        if (instance == null) {
            instance = new AppConfig();
        }
        
        return instance;
    }
    
    public AmazonSimpleEmailService getSimpleEmailService() {
        if (simpleEmailService == null) {
            simpleEmailService = AmazonSimpleEmailServiceClientBuilder.standard().withRegion(SES_REGION).build();
        }
        
        return simpleEmailService;
    }

    public CaptchaVerificationClient getCaptchaVerificationClient() {
        if (captchaVerificationClient == null) {
            captchaVerificationClient = new CaptchaVerificationClient(getUnirestClient());
        }

        return captchaVerificationClient;
    }

    private UnirestInstance getUnirestClient() {
        if (unirestInstance == null || !unirestInstance.isRunning()) {
            unirestInstance = Unirest.primaryInstance();
            unirestInstance.config().setObjectMapper(new JacksonObjectMapper());
        }
        
        return unirestInstance;
    }
}