import cn from "classnames";
import styles from "./styles.module.scss";
import verticalStyles from "./styles-vertical.module.scss";
import { NavLink } from "react-router-dom";

const Navigation = ({
    linksMapping: links, 
    onRouteClick = () => {},
    styleOverride = {}
}: NavigationProps) => (
    <nav className={cn(styles.navigation, styleOverride.navigation)}>
         <ul className={cn(styles.links, styleOverride.links)}>
            {Object.keys(links).map(path => (
                <NavLink end={path === "/"}
                        to={path}
                        key={path}
                        className={({ isActive }) => cn(
                            styles.link, 
                            styleOverride.link,
                            ...(isActive ? [styles.activeLink, styleOverride.activeLink] : []),
                        )}
                        onClick={onRouteClick}>
                    <li>
                        {links[path]}
                    </li>
                </NavLink>
            ))}
        </ul>
    </nav>
);

export default Navigation;

export const VerticalNavigation = (props: NavigationProps) => <Navigation {...props} styleOverride={verticalStyles} />;