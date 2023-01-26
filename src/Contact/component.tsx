import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import styles from "./styles.module.scss";
import ContactForm from "ContactForm/component";
import { useState, useEffect } from "react";
import { AlertColor } from "@mui/material";
import { getSnackbarConfig } from "./util";

const Contact = () => {
    const [result, setResult] = useState<ContactFormResult | void>();
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>();

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

            {!!snackbarMessage && (
                <Snackbar 
                    message={snackbarMessage}
                    open={!!snackbarMessage}
                    anchorOrigin={{vertical: "top", horizontal: "center"}}
                    onClose={() => setResult(undefined)}
                    autoHideDuration={15000} 
                >
                    <Alert severity={snackbarSeverity} variant="filled">
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}

export default Contact;