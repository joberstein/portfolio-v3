type EndpointStage = "dev" | "prod";

interface ContactFormProps {
    readonly setResult: (result: string) => void;
}

interface ContactFormData {
    readonly body: string;
    readonly captcha: string;
    readonly from: string;
    readonly replyToAddress: string;
    readonly subject: string;
}