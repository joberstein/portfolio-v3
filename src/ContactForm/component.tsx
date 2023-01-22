import { useState, useCallback, useEffect } from "react";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Progress from "@mui/material/CircularProgress";
import sendMessage from "./service";
import {recordInteraction} from "Analytics/service";
import styles from "./styles.module.scss";

const ContactForm: React.FC<ContactFormProps> = ({ 
    setResult,
}) => {
    const [loading, setLoading] = useState(false);
    const [captcha, setCaptcha] = useState("");
    const [from, setFrom] = useState("");
    const [replyToAddress, setReplyToAddress] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const onSendAttempt = (formSent: boolean) => {
        const action = !formSent ? "failure" : "success";

        setLoading(false);
        setResult(action);

        recordInteraction({ 
            action,
            label: "Contact Form",
            category: "form",
        });

        if (formSent) {
            setFrom("");
            setReplyToAddress("");
            setSubject("");
            setBody("");
        }
    }

    const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();

        setLoading(true);
        setResult(undefined);

        const data = { subject, body, replyToAddress, from, captcha };

        sendMessage(data)
            .then(onSendAttempt)
            .catch(() => onSendAttempt(false));
    };

    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.warn('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('contact_form');
        setCaptcha(token);
    }, [ executeRecaptcha ]);

    useEffect(() => {
        handleReCaptchaVerify();
    }, [ handleReCaptchaVerify ]);

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
                    rows={5}
                    value={body}
                    onChange={({ target }) => setBody(target.value)}
                    className={styles.inputTextBox}
                    placeholder="Type your message here..."
                    disabled={loading}
                    required
                />
            </div>

            <div className={styles.field}>
                <button
                    type="submit"
                    className={styles.formButton}
                    disabled={loading || !captcha} 
                    title={!captcha ? 'Sending is disabled until captcha verification has completed.' : ''}
                >
                    Send Message
                </button>
            </div>
        </form>
    );
}

export default ContactForm;