import { getSnackbarConfig } from "./util";

describe('src/Contact/util', () => {
    describe('getSnackbarConfig', () => {
        let result: ContactFormResult | void;

        beforeEach(() => {
            result = undefined;
        });
        
        it('Returns the config for a successful result', () => {
            result = 'success';
            
            const { severity, message } = getSnackbarConfig(result);
            expect(severity).toEqual("success");
            expect(message).toEqual("Successfully sent your message!");
        });

        it('Returns the config for a failed result', () => {
            result = 'failure';
            
            const { severity, message } = getSnackbarConfig(result);
            expect(severity).toEqual("error");
            expect(message).toEqual("Uh-oh, it looks like there was an error sending your message. Please try again.");
        });

        it('Returns the config for an undefined result', () => {
            const { severity, message } = getSnackbarConfig(result);
            expect(severity).toBeUndefined();
            expect(message).toBeUndefined();
        });
    });
});