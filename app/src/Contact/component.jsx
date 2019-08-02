import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import styles from "./styles.module.scss";
import ContactForm from "ContactForm/component";

class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showErrorMessage: false};
    }

    render() {
        return (
            <div className={styles.contact}>
                <h1>Contact</h1>

                <div className={styles.contents}>
                    <ContactForm showError={wasError => this.setShowErrorMessage(wasError)}/>
                </div>

                <Snackbar message="Uh-oh, it looks like there was an error sending your message. Please try again."
                          open={this.state.showErrorMessage}
                          anchorOrigin={{vertical: "top", horizontal: "center"}}
                          onClose={(event, reason) => "clickaway" !== reason && this.setShowErrorMessage(false)}
                          autoHideDuration={15000} />
            </div>
        );
    }

    setShowErrorMessage(showErrorMessage) {
        this.setState({showErrorMessage});
    }
}

export default Contact;