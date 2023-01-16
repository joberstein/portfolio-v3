import { useEffect } from "react";
import styles from "./styles.module.scss";
import {recordNonInteractionEvent} from "Analytics/service";
import {getPathname} from "windowUtils";

const NotFound = () => {

    useEffect(() => {
        recordNonInteractionEvent({
            action: "404", 
            label: getPathname(), 
            category: "PageView",
        });
    }, []);

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

export default NotFound;