import {sendMessage, getCaptchaToken} from "../ContactForm/service";

describe("src/ContactForm/service", () => {
    beforeAll(() => {
        console.error = jest.fn();
    });

    describe("sendMessage", () => {
        const fetch = jest.spyOn(window, 'fetch');

        const data: ContactFormData = {
            replyToAddress: '',
            subject: '',
            from: '',
            body: '',
            captcha: '',
        };
    
        const requestOptions = {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            mode: 'cors',
        };
    
        beforeAll(() => {
            process.env.REACT_APP_MESSAGES_API_ENDPOINT = "/testEndpoint";
        });
        
        beforeEach(() => {
            process.env.NODE_ENV = 'development';
            const mockResponse = { status: 200 } as Response;
            fetch.mockResolvedValue(mockResponse);
        });
    
        it('Sends a message to the dev endpoint', () => {
            expect(sendMessage(data)).resolves.toBeTruthy();
            expect(fetch).toHaveBeenCalledWith("/testEndpoint/dev/messages", requestOptions);
        });
    
        it('Sends a message to the prod endpoint', () => {
            process.env.NODE_ENV = 'production';
            expect(sendMessage(data)).resolves.toBeTruthy();
            expect(fetch).toHaveBeenCalledWith("/testEndpoint/prod/messages", requestOptions);
        });
    
        it('Does not send a message to when the endpoint stage is missing', () => {
            process.env.NODE_ENV = '';
            expect(() => sendMessage(data)).toThrowError('Endpoint stage is missing.');
            expect(fetch).not.toHaveBeenCalled();
        });
    
        it('Fails to send a message with a 4xx or 5xx error', () => {
            const mockResponse = { status: 400 } as Response;
            fetch.mockResolvedValue(mockResponse);
    
            expect(sendMessage(data)).resolves.toBeFalsy();
            expect(fetch).toHaveBeenCalled();
        });
    
        it('Fails to send a message when the request rejects', () => {
            fetch.mockRejectedValue({});
    
            expect(sendMessage(data)).resolves.toBeFalsy();
            expect(fetch).toHaveBeenCalled();
        });
    });

    describe("getCaptchaToken", () => {
        const action = "test";
        const testToken = "123";

        let executeRecaptcha: jest.Mock;

        beforeEach(() => {
            executeRecaptcha = jest.fn().mockResolvedValue(testToken);
        });

        it('Fetches the captcha token', async () => {
            const token = await getCaptchaToken({ executeRecaptcha, action });
            expect(token).toEqual(testToken);
            expect(executeRecaptcha).toHaveBeenCalledWith(action);
        });

        it('Returns an empty token if the recaptcha function rejects', async () => {
            executeRecaptcha.mockRejectedValue({});

            const token = await getCaptchaToken({ executeRecaptcha, action });
            expect(token).toEqual("");
            expect(executeRecaptcha).toHaveBeenCalledWith(action);
        });

        it('Returns an empty token if the recaptcha function is blank', async () => {
            const token = await getCaptchaToken({ executeRecaptcha: undefined, action });
            expect(token).toEqual("");
            expect(executeRecaptcha).not.toHaveBeenCalled();
        });
    });
});