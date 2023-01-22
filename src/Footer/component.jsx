import styles from "./styles.module.scss";
import resume from "./files/resume.pdf";
import ExternalLinks, {createTextLink} from "ExternalLinks/component";
import {VerticalNavigation} from "Navigation/component";
import { getLinks, LinkTypes } from "Navigation/util";

const baseLinks = getLinks({ type: LinkTypes.Base });

const contactLinks = [
    createTextLink(resume, "Resume (PDF)"),
    createTextLink("https://joberstein.github.io/resume", "Resume (HTML)"),
    createTextLink("https://www.linkedin.com/in/jesseoberstein", "LinkedIn"),
    createTextLink("https://www.github.com/joberstein", "GitHub"),
];

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.linkSection}>
                <h3 className={styles.linkSectionTitle}>
                    Site Navigation
                </h3>
                <VerticalNavigation links={baseLinks}/>
            </div>

            <div className={styles.linkSection}>
                <h3 className={styles.linkSectionTitle}>
                    External Links
                </h3>
                <ExternalLinks routes={contactLinks}/>
            </div>
        </div>
    </footer>
);

export default Footer;