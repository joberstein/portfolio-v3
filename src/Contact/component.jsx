import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import styles from "./styles.module.scss";
import ContactForm from "ContactForm/component";
import { useState, useEffect } from "react";

const getSnackbarConfig = result => {
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
            return {};
    }
};

const Contact = () => {
    const [result, setResult] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("");

    useEffect(() => {
        const { severity, message } = getSnackbarConfig(result);
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
    }, [result]);

    return (
        <div className={styles.contact}>
            <h1>Contact</h1>

            <div className={styles.contents}>
                <ContactForm {...{ setResult }} />
            </div>

            <Snackbar 
                message={snackbarMessage}
                open={!!snackbarMessage}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                onClose={() => setResult("")}
                autoHideDuration={15000} 
            >
                <Alert severity={snackbarSeverity} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Contact;