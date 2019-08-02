import React from "react";
import styles from "./styles.module.scss";
import resume from "./files/resume_2019-3.pdf";
import ExternalLinks, {createTextLink} from "../ExternalLinks/component";
import {createRouteLink, VerticalNavigation} from "Navigation/component";
import Home from "Home/component";
import About from "About/component";
import Portfolio from "Portfolio/component";
import Contact from "Contact/component";

const portfolioLinks = [
    createRouteLink("/", "Home", Home),
    createRouteLink("/about", "About", About),
    createRouteLink("/portfolio", "Portfolio", Portfolio),
    createRouteLink("/contact", "Contact", Contact)
];

const contactLinks = [
    createTextLink(resume, "Resume"),
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
                <VerticalNavigation routes={portfolioLinks}/>
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