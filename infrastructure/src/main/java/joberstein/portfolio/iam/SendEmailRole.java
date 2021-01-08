package joberstein.portfolio.iam;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import joberstein.portfolio.BaseStack;
import software.amazon.awscdk.core.Construct;
import software.amazon.awscdk.core.Environment;
import software.amazon.awscdk.core.StackProps;
import software.amazon.awscdk.services.iam.ManagedPolicy;
import software.amazon.awscdk.services.iam.Role;
import software.amazon.awscdk.services.iam.ServicePrincipal;

public class SendEmailRole extends BaseStack<Role> {

    private static final String LAMBDA_BASIC_EXECUTION_POLICY = "service-role/AWSLambdaBasicExecutionRole";
    private static final String SES_FULL_ACCESS_POLICTY = "AmazonSESFullAccess";

    public SendEmailRole(final Construct scope, final Environment environment) {
        super(scope, "sendEmailRole", StackProps.builder()
            .env(environment)
            .build());

        this.init();
    }

    protected Role build() {
        return Role.Builder.create(this, "sendEmailRole")
            .roleName("sendEmailFromLambda")
            .description("Allows the 'sendEmail' lambda to execute and utilize Amazon SES.")
            .assumedBy(new ServicePrincipal("lambda.amazonaws.com"))
            .managedPolicies(Stream.of(LAMBDA_BASIC_EXECUTION_POLICY, SES_FULL_ACCESS_POLICTY)
                .map(ManagedPolicy::fromAwsManagedPolicyName)
                .collect(Collectors.toList()))
            .build();
    }
    
}
