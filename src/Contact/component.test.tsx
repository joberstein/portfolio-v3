import { render, RenderResult, fireEvent, act } from "@testing-library/react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Contact from "./component";
import * as contactFormService from "../ContactForm/service";

jest.useFakeTimers();

const renderComponent = () => render(<Contact/>, { 
    wrapper: ({ children }) => (
        <GoogleReCaptchaProvider reCaptchaKey="">
            {children}
        </GoogleReCaptchaProvider>
    )
});

const getContactForm = (component: RenderResult) => component.queryByRole('form', { name: 'contact' });
const getSubmitButton = (component: RenderResult) => component.getByRole('button');
const getSnackbar = (component: RenderResult) => component.queryByRole('presentation');

describe('src/Contact/component', () => {
    const sendMessage = jest.spyOn(contactFormService, 'sendMessage');
    
    beforeEach(() => {
        sendMessage.mockResolvedValue(true);
    });

    it("Renders the header", () => {
        const component = renderComponent();
        expect(component.queryByText("Contact")).toBeInTheDocument();
    });

    it("Renders the contact form", () => {
        const component = renderComponent();
        expect(getContactForm(component)).toBeInTheDocument();
    });

    it('Shows a snackbar on form send success', async () => {
        const component = renderComponent();
        const submitButton = getSubmitButton(component);

        fireEvent.submit(submitButton);
        await component.findByText("Successfully sent your message!");
    });

    it('Shows a snackbar on form send failure', async () => {
        sendMessage.mockResolvedValue(false);

        const component = renderComponent();
        const submitButton = getSubmitButton(component);

        fireEvent.submit(submitButton);
        await component.findByText("Uh-oh, it looks like there was an error sending your message. Please try again.");
    });

    it('Shows a snackbar on form send error', async () => {
        sendMessage.mockRejectedValue({});

        const component = renderComponent();
        const submitButton = getSubmitButton(component);

        fireEvent.submit(submitButton);
        await component.findByText("Uh-oh, it looks like there was an error sending your message. Please try again.");
    });

    it('Dismisses the snackbar after 15 seconds', async () => {
        const component = renderComponent();
        const submitButton = getSubmitButton(component);

        fireEvent.submit(submitButton);
        await component.findByRole('presentation');

        act(() => jest.advanceTimersByTime(15_000));

        expect(getSnackbar(component)).not.toBeInTheDocument();
    });

    it('Dismisses the snackbar with the escape key', async () => {
        const component = renderComponent();
        const submitButton = getSubmitButton(component);

        fireEvent.submit(submitButton);
        const snackbar = await component.findByRole('presentation');

        fireEvent.keyDown(snackbar, { key: "Escape" });

        expect(getSnackbar(component)).not.toBeInTheDocument();
    });

    it('Dismisses the snackbar with background click', async () => {
        const component = renderComponent();
        const submitButton = getSubmitButton(component);

        fireEvent.submit(submitButton);
        await component.findByRole('presentation');

        fireEvent.click(submitButton);

        expect(getSnackbar(component)).not.toBeInTheDocument();
    });
});