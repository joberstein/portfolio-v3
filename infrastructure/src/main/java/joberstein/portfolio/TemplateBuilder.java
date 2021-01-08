package joberstein.portfolio;

import joberstein.portfolio.apiGateway.MessagesApi;
import joberstein.portfolio.iam.SendEmailRole;
import joberstein.portfolio.lambda.SendEmailLambda;
import software.amazon.awscdk.core.App;
import software.amazon.awscdk.core.Environment;

public class TemplateBuilder {

    public static void main(String[] args) {
        App app = new App();

        Environment env = Environment.builder()
            .account(System.getenv("CDK_DEFAULT_ACCOUNT"))
            .region(System.getenv("CDK_DEFAULT_REGION"))
            .build();

        var sendEmailRole = new SendEmailRole(app, env);
        var sendEmailLambda = new SendEmailLambda(app, env, sendEmailRole);
        new MessagesApi(app, env, sendEmailLambda);
        
        app.synth();
    }
    
}