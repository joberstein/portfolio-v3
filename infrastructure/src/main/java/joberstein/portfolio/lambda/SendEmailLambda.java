package joberstein.portfolio.lambda;

import joberstein.portfolio.BaseStack;
import joberstein.portfolio.iam.SendEmailRole;
import software.amazon.awscdk.core.Construct;
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
            .description("Sends an email out with SimpleEmailService.")
            .role(this.role)
            .runtime(Runtime.NODEJS_12_X) // Placeholder runtime since Java runtimes don't allow inline code.
            .handler("placeholder.handler")
            .code(Code.fromInline("// Placeholder for code"))
            .build();
    }
}
