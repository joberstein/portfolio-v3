import { useState } from "react";
import PropTypes from "prop-types";
import {GoogleReCaptchaProvider, GoogleReCaptcha} from 'react-google-recaptcha-v3';
import Progress from "@mui/material/CircularProgress";
import sendMessage from "./service";
import {recordInteraction} from "Analytics/service";
import styles from "./styles.module.scss";

const ContactForm = ({ setResult }) => {
    const [loading, setLoading] = useState(false);
    const [captcha, setCaptcha] = useState("");
    const [from, setFrom] = useState("");
    const [replyToAddress, setReplyToAddress] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const onSendAttempt = formSent => {
        setLoading(false);

        const eventAction = !formSent ? "failure" : "success";
        recordInteraction(eventAction, "Contact Form", "form");
        setResult(eventAction);

        if (formSent) {
            setFrom("");
            setReplyToAddress("");
            setSubject("");
            setBody("");
        }
    }

    const onSubmit = event => {
        event.preventDefault();

        setLoading(true);
        setResult("");

        const data = { subject, body, replyToAddress, from, captcha };

        sendMessage(data)
            .then(onSendAttempt)
            .catch(() => onSendAttempt(false));
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            {loading && (
                <div className={styles.loading}>
                    <Progress size={100} thickness={2.5} />
                </div>
            )}

            <div className={styles.field}>
                <input 
                    name="from" 
                    type="text" 
                    value={from}
                    onChange={({ target }) => setFrom(target.value)}
                    className={styles.inputField}
                    placeholder="Name"
                    disabled={loading}
                    autoFocus 
                />
            </div>

            <div className={styles.field}>
                <input 
                    name="replyToAddress" 
                    type="email" 
                    value={replyToAddress}
                    onChange={({ target }) => setReplyToAddress(target.value)}
                    className={styles.inputField}
                    placeholder="Email" 
                    title="Please enter a valid email."
                    disabled={loading}
                    required
                />
            </div>

            <div className={styles.field}>
                <input 
                    name="subject" 
                    type="text" 
                    value={subject}
                    onChange={({ target }) => setSubject(target.value)}
                    className={styles.inputField}
                    placeholder="Subject"
                    disabled={loading}
                    required
                />
            </div>

            <div className={styles.field}>
                <textarea 
                    name="body" 
                    rows="5" 
                    value={body}
                    onChange={({ target }) => setBody(target.value)}
                    className={styles.inputTextBox}
                    placeholder="Type your message here..."
                    disabled={loading}
                    required
                />
            </div>

            <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_CLIENT_KEY}>
                <GoogleReCaptcha action="contact_form" onVerify={setCaptcha} />
            </GoogleReCaptchaProvider>

            <div className={styles.field}>
                <button className={styles.formButton} type="submit" disabled={loading}>
                    Send Message
                </button>
            </div>
        </form>
    );
}

ContactForm.propTypes = {
    showError: PropTypes.func.isRequired
};

export default ContactForm;