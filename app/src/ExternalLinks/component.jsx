import React from "react";
import PropTypes from "prop-types";
import {recordInteraction} from "Analytics/service";
import styles from "./styles.module.scss";

const ExternalLinks = ({linkType, routes}) => (
    <nav className={styles.externalLinks}>
         <ul className={styles.links}>
            {routes.map(route => (
                <li key={route.link}>
                    <a href={route.link} target="_blank" rel="noopener noreferrer" className={styles.link}
                       onClick={() => recordInteraction("click", route.text, "link")}>
                        {getLink(linkType, route)}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);

const getLink = (linkType, route) => {
    return linkType === "image" ? <img src={route.imagePath} alt={route.altText} /> : route.text;
};

ExternalLinks.defaultProps = {
    routes: [],
    linkType: "text"
};

ExternalLinks.propTypes = {
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            link: PropTypes.string,
            imagePath: PropTypes.string,
            altText: PropTypes.string,
            text: PropTypes.string
        })
    ),
    linkType: PropTypes.oneOf(["text", "image"])
};

export default ExternalLinks;

export const createImageLink = (link, imagePath, altText) => ({link, imagePath, altText});
export const createTextLink = (link, text) => ({link, text});