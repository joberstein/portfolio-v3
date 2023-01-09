import Snackbar from "@material-ui/core/Snackbar";
import styles from "./styles.module.scss";
import ContactForm from "ContactForm/component";
import { useState } from "react";

const Contact = () => {
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    return (
        <div className={styles.contact}>
            <h1>Contact</h1>

            <div className={styles.contents}>
                <ContactForm showError={wasError => setShowErrorMessage(wasError)}/>
            </div>

            <Snackbar message="Uh-oh, it looks like there was an error sending your message. Please try again."
                        open={showErrorMessage}
                        anchorOrigin={{vertical: "top", horizontal: "center"}}
                        onClose={(event, reason) => "clickaway" !== reason && setShowErrorMessage(false)}
                        autoHideDuration={15000} />
        </div>
    );
}

export default Contact;