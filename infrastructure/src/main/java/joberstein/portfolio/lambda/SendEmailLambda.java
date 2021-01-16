package joberstein.portfolio.lambda;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ListVersionsRequest;
import com.amazonaws.services.s3.model.S3VersionSummary;
import joberstein.portfolio.BaseStack;
import joberstein.portfolio.iam.SendEmailRole;
import joberstein.portfolio.s3.SendEmailBucket;
import software.amazon.awscdk.core.Construct;
import software.amazon.awscdk.core.Duration;
import software.amazon.awscdk.core.Environment;
import software.amazon.awscdk.core.StackProps;
import software.amazon.awscdk.services.iam.Role;
import software.amazon.awscdk.services.lambda.Code;
import software.amazon.awscdk.services.lambda.Function;
import software.amazon.awscdk.services.lambda.Runtime;
import software.amazon.awscdk.services.lambda.Version;
import software.amazon.awscdk.services.s3.Bucket;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.regex.Pattern;

public class SendEmailLambda extends BaseStack<Function> {

    private static final String GOOGLE_CAPTCHA_KEY = "GOOGLE_CAPTCHA_KEY";
    private static final String COMMIT_MESSAGE = "COMMIT_MESSAGE";

    private static final String FUNCTION_NAME = "sendEmail";
    private static final String FUNCTION_DESCRIPTION = "Sends an email out with SimpleEmailService.";
    private static final String HANDLER = "joberstein.portfolio.SendEmailHandler";
    private static final String OBJECT_KEY = "assets/sendEmail-jar-with-dependencies.jar";

    private static final Pattern COMMIT_PATTERN = Pattern.compile("^(\\w{7})\\s(.*)");
    private static final DateTimeFormatter ISO_DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("YYYY-MM-DD hh:mm:ss");

    private final AmazonS3 s3Client;
    private final Role role;
    private final Bucket bucket;

    public SendEmailLambda(
        Construct scope, Environment environment,
        AmazonS3 s3Client, SendEmailRole role, SendEmailBucket bucket
    ) {
        super(scope, "sendEmailLambda", StackProps.builder()
            .env(environment)
            .build());

        this.s3Client = s3Client;

        this.bucket = bucket.getInstance();
        this.addDependency(bucket);

        this.role = role.getInstance();
        this.addDependency(role);

        this.init();

        var commitMatcher = COMMIT_PATTERN.matcher(getContextValue(COMMIT_MESSAGE));
        var commitHash = commitMatcher.matches() ? commitMatcher.group(1) : "Unknown hash";
        var commitMessage = commitMatcher.matches() ? commitMatcher.group(2) : "Commit message unavailable.";
        var formattedDate = ISO_DATE_TIME_FORMATTER.format(LocalDateTime.now());

        Version.Builder.create(this, "sendEmailVersionId")
            .lambda(this.getInstance())
            .description(String.format("[%s] %s (%s)", formattedDate, commitMessage, commitHash))
            .build();
    }

	protected Function build() {
        return Function.Builder.create(this, "sendEmailLambda")
            .functionName(FUNCTION_NAME)
            .description(FUNCTION_DESCRIPTION)
            .role(this.role)
            .runtime(Runtime.JAVA_11) 
            .handler(HANDLER)
            .code(Code.fromBucket(this.bucket, OBJECT_KEY, getLatestVersionId()))
            .environment(Map.of(GOOGLE_CAPTCHA_KEY, getContextValue(GOOGLE_CAPTCHA_KEY)))
            .timeout(Duration.seconds(15))
            .memorySize(512)
            .build();
    }

    private String getContextValue(String key) {
        return (String) this.getNode().tryGetContext(key);
    }

    private String getLatestVersionId() {
        var listVersionsRequest = new ListVersionsRequest()
            .withBucketName(SendEmailBucket.BUCKET_NAME)
            .withPrefix(OBJECT_KEY);

        try {
            return this.s3Client.listVersions(listVersionsRequest)
                .getVersionSummaries()
                .stream()
                .filter(S3VersionSummary::isLatest)
                .findFirst()
                .map(S3VersionSummary::getVersionId)
                .orElse("");
        } catch (SdkClientException e) {
            return "";
        }
    }
}
