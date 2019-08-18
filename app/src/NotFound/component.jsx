import React from "react";
import styles from "./styles.module.scss";
import {recordNonInteractionEvent} from "Analytics/service";

class NotFound extends React.Component {

    componentDidMount() {
        recordNonInteractionEvent("404", window.location.pathname, "PageView");
    }

    render() {
        return (
            <div className={styles.notFound}>
                <h1>Page Not Found</h1>
                <div className={styles.content}>
                    <p className={styles.mainText}>
                        Uh-oh, seems like the page you're looking for doesn't exist.
                    </p>
                    <p className={styles.subText}>
                        Try checking the header or footer for some on-site links.
                    </p>
                </div>
            </div>
        );
    }
}

export default NotFound;