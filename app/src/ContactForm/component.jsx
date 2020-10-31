import React from "react";
import PropTypes from "prop-types";
import {ClipLoader} from "react-spinners";
import {GoogleReCaptchaProvider, GoogleReCaptcha} from 'react-google-recaptcha-v3';
import styles from "./styles.module.scss";
import sendMessage from "./service";
import {recordInteraction} from "Analytics/service";

class ContactForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sent: false,
            captcha: "",
            contents: {
                from: "",
                replyToAddress: "",
                subject: "",
                body: ""
            }
        };
    }

    render() {
        return this.state.loading ?
            this.renderSendingMessage() :
            this.state.sent ? this.renderSendSuccess() : this.renderForm();
    }

    renderForm = () => (
        <form className={styles.form} onSubmit={this.onSubmit}>

            <div className={styles.field}>
                <input name="from" type="text" value={this.state.contents.from}
                       onChange={event => this.onUpdateContents("from", event)}
                       className={styles.inputField}
                       placeholder="Name" autoFocus />
            </div>

            <div className={styles.field}>
                <input name="replyToAddress" type="email" value={this.state.contents.replyToAddress}
                       onChange={event => this.onUpdateContents("replyToAddress", event)}
                       className={styles.inputField}
                       placeholder="Email"
                       title="Please enter a valid email."
                       required/>
            </div>

            <div className={styles.field}>
                <input name="subject" type="text" value={this.state.contents.subject}
                       onChange={event => this.onUpdateContents("subject", event)}
                       className={styles.inputField}
                       placeholder="Subject" required/>
            </div>

            <div className={styles.field}>
                    <textarea name="body" rows="5" value={this.state.contents.body}
                              onChange={event => this.onUpdateContents("body", event)}
                              className={styles.inputTextBox}
                              placeholder="Type your message here..."
                              required/>
            </div>

            <GoogleReCaptchaProvider reCaptchaKey="6LfM0KsUAAAAACoONanc2Bl6a8KqpyxBVyeiv4Px">
                <GoogleReCaptcha action="contact_form" onVerify={this.setCaptcha} />
            </GoogleReCaptchaProvider>

            <div className={styles.field}>
                <button className={styles.formButton} type="submit">
                    Send Message
                </button>
            </div>
        </form>
    );

    renderSendingMessage = () => (
        <ClipLoader size={100} sizeUnit="px" color="#123abc"/>
    );

    renderSendSuccess = () => (
        <div className={styles.sendSuccess}>Successfully sent your message!</div>
    );


    setLoading = loading => this.setState({loading});
    setSent = sent => this.setState({sent});
    setCaptcha = captcha => this.setState({captcha});

    onUpdateContents = (key, event) => {
        this.setState({
            contents: {
                ...this.state.contents,
                [key]: event.target.value
            }
        });
    };

    onSubmit = event => {
        event.preventDefault();

        this.setLoading(true);
        this.props.showError(false);

        const {contents, captcha} = this.state;
        const data = {...contents, captcha};

        sendMessage(data)
            .then(this.onSendAttempt)
            .catch(() => this.onSendAttempt(false));
    };

    onSendAttempt = formSent => {
        this.setSent(formSent);
        this.setLoading(false);
        this.props.showError(!formSent);

        const eventAction = !formSent ? "failure" : "success";
        recordInteraction(eventAction, "Contact Form", "form");
    }
}

ContactForm.propTypes = {
    showError: PropTypes.func.isRequired
};

export default ContactForm;