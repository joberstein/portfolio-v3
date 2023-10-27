import { render, RenderResult, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ContactForm from "./component";
import * as contactFormService from "../ContactForm/service";
import * as analyticsService from "../Analytics/service";

let props: ContactFormProps;

const renderComponent = () => render(<ContactForm {...props} />, { 
    wrapper: ({ children }) => (
        <GoogleReCaptchaProvider reCaptchaKey="">
            {children}
        </GoogleReCaptchaProvider>
    )
});

const getContactForm = (component: RenderResult) => component.queryByRole('form', { name: 'contact' });
const getSubmitButton = (component: RenderResult) => component.getByRole('button');
const getFromInput = (component: RenderResult) => component.getByPlaceholderText("Name");
const getReplyToAddressInput = (component: RenderResult) => component.getByPlaceholderText("Email");
const getSubjectInput = (component: RenderResult) => component.getByPlaceholderText("Subject");
const getBodyInput = (component: RenderResult) => component.getByPlaceholderText("Type your message here...");

const fillFormFields = async (component: RenderResult) => {
    await userEvent.type(getFromInput(component), '1');
    await userEvent.type(getReplyToAddressInput(component), "test@test.com");
    await userEvent.type(getSubjectInput(component), '3');
    await userEvent.type(getBodyInput(component), '4');
};

const submitContactForm = async(component: RenderResult) => {
    const submitButton = getSubmitButton(component);
    await waitFor(() => expect(submitButton).toBeEnabled());
    await userEvent.click(submitButton);
};

const emptyFormValues = {
    from: "",
    replyToAddress: "",
    subject: "",
    body: "",
};

describe('src/ContactForm/component', () => {
    const sendMessage = jest.spyOn(contactFormService, 'sendMessage');
    const getCaptchaToken = jest.spyOn(contactFormService, 'getCaptchaToken');
    jest.spyOn(analyticsService, 'recordInteraction');
    
    beforeEach(() => {
        sendMessage.mockResolvedValue(true);
        getCaptchaToken.mockResolvedValue("");

        props = {
            setResult: jest.fn(),
        };
    });

    it("Renders the contact form", () => {
        const component = renderComponent();
        expect(getContactForm(component)).toBeInTheDocument();
    });

    it("Renders the 'From' input", () => {
        const component = renderComponent();
        expect(component.queryByPlaceholderText("Name")).toBeInTheDocument();
    });

    it("Renders the 'Reply To Address' input", () => {
        const component = renderComponent();
        expect(component.queryByPlaceholderText("Email")).toBeInTheDocument();
    });

    it("Renders the 'Subject' input", () => {
        const component = renderComponent();
        expect(component.queryByPlaceholderText("Subject")).toBeInTheDocument();
    });
        
    it("Renders the 'Body' input", () => {
        const component = renderComponent();
        expect(component.queryByPlaceholderText("Type your message here...")).toBeInTheDocument();
    });

    it("Disables the submit button if captcha verification is not ready", async () => {
        const component = renderComponent();
        expect(getSubmitButton(component)).toBeDisabled();
    });

    
    describe("Validating Inputs", () => {
        it("Does not require the 'from' input", async () => {
            const component = renderComponent();
            const from = getFromInput(component);

            expect(from).toBeValid();

            await userEvent.type(from, "test");
            expect(from).toBeValid();
        });

        it("Validates the 'replyToAddress' input", async () => {
            const component = renderComponent();
            const replyToAddress = getReplyToAddressInput(component);

            expect(replyToAddress).toBeInvalid();

            await userEvent.type(replyToAddress, "email");
            expect(replyToAddress).toBeInvalid();

            await userEvent.clear(replyToAddress);
            await userEvent.type(replyToAddress, "test@test.com");
            expect(replyToAddress).toBeValid();
        });

        it("Validates the 'subject' input", async () => {
            const component = renderComponent();
            const subject = getSubjectInput(component);

            expect(subject).toBeInvalid();

            await userEvent.type(subject, "test");
            expect(subject).toBeValid();
        });

        it("Validates the 'body' input", async () => {
            const component = renderComponent();
            const body = getBodyInput(component);

            expect(body).toBeInvalid();

            await userEvent.type(body, "test");
            expect(body).toBeValid();
        });
    });

    describe("Sending a contact form message", () => {
        beforeEach(() => {
            getCaptchaToken.mockResolvedValue("123");
        });
        
        it("Sends a message successfully", async () => {
            const component = renderComponent();
            
            await act(async () => {
                await fillFormFields(component);
                await submitContactForm(component);
            });

            expect(props.setResult).toHaveBeenCalledWith("success");
            expect(getContactForm(component)).toHaveFormValues(emptyFormValues);
            expect(contactFormService.sendMessage).toHaveBeenCalledWith({
                from: "1", 
                replyToAddress: "test@test.com",
                subject: "3", 
                body: "4",
                captcha: "123",
             });
    
            expect(analyticsService.recordInteraction).toHaveBeenCalledWith({
                action: "success",
                category: "form",
                label: "Contact Form",
            });
        });

        it("Fails to send a message", async () => {
            sendMessage.mockResolvedValue(false);

            const component = renderComponent();
            
            await act(async () => {
                await fillFormFields(component);
                await submitContactForm(component);
            });

            expect(props.setResult).toHaveBeenCalledWith("failure");
            expect(getContactForm(component)).not.toHaveFormValues(emptyFormValues);
            expect(contactFormService.sendMessage).toHaveBeenCalledWith({
                from: "1", 
                replyToAddress: "test@test.com",
                subject: "3", 
                body: "4",
                captcha: "123",
             });
    
            expect(analyticsService.recordInteraction).toHaveBeenCalledWith({
                action: "failure",
                category: "form",
                label: "Contact Form",
            });
        });

        it("Errors when sending a message", async () => {
            sendMessage.mockRejectedValue({});

            const component = renderComponent();
            
            await act(async () => {
                await fillFormFields(component);
                await submitContactForm(component);
            });

            expect(props.setResult).toHaveBeenCalledWith("failure");
            expect(getContactForm(component)).not.toHaveFormValues(emptyFormValues);
            expect(contactFormService.sendMessage).toHaveBeenCalledWith({
                from: "1", 
                replyToAddress: "test@test.com",
                subject: "3", 
                body: "4",
                captcha: "123",
             });
    
            expect(analyticsService.recordInteraction).toHaveBeenCalledWith({
                action: "failure",
                category: "form",
                label: "Contact Form",
            });
        });
    });
});