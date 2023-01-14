import {recordInteraction} from "Analytics/service";
import styles from "./styles.module.scss";

const ExternalLink: React.FC<ExternalLinkProps> = ({
    route, 
    linkType,
}) => (
    <a 
        href={route.link}
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.link}
        onClick={() => recordInteraction({
            action: "click", 
            label: route.text, 
            category: "link",
        })}
    >
        {linkType === "image" ? 
            <img src={route.imagePath} alt={route.altText} /> : 
            route.text
        }
    </a>
);

const ExternalLinks: React.FC<ExternalLinksProps> = ({
    linkType = "text", 
    routes = []
}) => (
    <nav className={styles.externalLinks}>
         <ul className={styles.links}>
            {routes.map(route => (
                <li key={route.link}>
                    <ExternalLink {...{ route, linkType}} />
                </li>
            ))}
        </ul>
    </nav>
);

export default ExternalLinks;

export const createImageLink = (link: string, imagePath: string, altText: string) => ({link, imagePath, altText});
export const createTextLink = (link: string, text: string) => ({link, text});