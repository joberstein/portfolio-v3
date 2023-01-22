import styles from "./styles.module.scss";
import resume from "./files/resume.pdf";
import ExternalLinks from "ExternalLinks/component";
import { VerticalNavigation } from "Navigation/component";
import { getSiteLinks, SiteLinkCategory } from "Navigation/util";

const baseLinks = getSiteLinks({ type: SiteLinkCategory.Base });

const contactLinks: SiteLink[] = [
    { path: resume, text: "Resume (PDF)" },
    { path: "https://joberstein.github.io/resume", text: "Resume (HTML)" },
    { path: "https://www.linkedin.com/in/jesseoberstein", text: "LinkedIn" },
    { path: "https://www.github.com/joberstein", text: "GitHub" },
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
                <ExternalLinks links={contactLinks}/>
            </div>
        </div>
    </footer>
);

export default Footer;