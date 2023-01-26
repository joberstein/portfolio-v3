type EndpointStage = "dev" | "prod";

interface ContactFormProps {
    readonly setResult: (result: ContactFormResult | void) => void;
}

interface ContactFormData {
    readonly body: string;
    readonly captcha: string;
    readonly from: string;
    readonly replyToAddress: string;
    readonly subject: string;
}

interface GetCaptchaTokenArgs {
    executeRecaptcha?: (action?: string) => Promise<string>;
    action?: string;
}