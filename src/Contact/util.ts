export const getSnackbarConfig = (result: ContactFormResult | void): SnackbarConfig => {
    switch (result) {
        case "success":
            return {
                severity: "success",
                message: "Successfully sent your message!",
            };
        case "failure": 
            return {
                severity: "error",
                message: "Uh-oh, it looks like there was an error sending your message. Please try again."
            };
        default:
            return {} as never;
    }
};