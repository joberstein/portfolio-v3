package joberstein.portfolio.lambda;

import joberstein.portfolio.BaseStack;
import joberstein.portfolio.iam.SendEmailRole;
import software.amazon.awscdk.core.Construct;
import software.amazon.awscdk.core.Duration;
import software.amazon.awscdk.core.Environment;
import software.amazon.awscdk.core.StackProps;
import software.amazon.awscdk.services.iam.Role;
import software.amazon.awscdk.services.lambda.Code;
import software.amazon.awscdk.services.lambda.Function;
import software.amazon.awscdk.services.lambda.Runtime;

public class SendEmailLambda extends BaseStack<Function> {

    private final Role role;

    public SendEmailLambda(Construct scope, Environment environment, SendEmailRole sendEmailRole) {
        super(scope, "sendEmailLambda", StackProps.builder()
            .env(environment)
            .build());

        this.role = sendEmailRole.getInstance();
        this.addDependency(sendEmailRole);
        this.init();
    }

	protected Function build() {
        return Function.Builder.create(this, "sendEmailLambda")
            .functionName("sendEmail")
            .handler("")
            .description("Sends an email out with SimpleEmailService.")
            .runtime(Runtime.NODEJS_12_X) // Java runtimes don't allow inline code.
            .role(this.role)
            .code(Code.fromInline("// Placeholder for code"))
            .memorySize(512)
            .timeout(Duration.seconds(15))
            .build();       
    }
}
