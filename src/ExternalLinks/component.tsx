import {recordInteraction} from "Analytics/service";
import styles from "./styles.module.scss";

const ExternalLinks: React.FC<ExternalLinksProps> = ({
    links = []
}) => (
    <nav className={styles.externalLinks}>
         <ul className={styles.links}>
            {links.map(({ text, path }) => (
                <li key={path}>
                     <a 
                        href={path}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.link}
                        onClick={() => recordInteraction({
                            action: "click", 
                            label: text, 
                            category: "link",
                        })}
                    >
                        {text}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);

export default ExternalLinks;