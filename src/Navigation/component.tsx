import cn from "classnames";
import styles from "./styles.module.scss";
import verticalStyles from "./styles-vertical.module.scss";
import { NavLink } from "react-router-dom";

const Navigation = ({
    links,
    onRouteClick = () => {},
    styleOverride = {}
}: NavigationProps) => (
    <nav className={cn(styles.navigation, styleOverride.navigation)}>
         <ul className={cn(styles.links, styleOverride.links)}>
            {links.map(({ path, text }) => (
                <NavLink
                    key={path}
                    end={path === "/"}
                    to={path}
                    className={({ isActive }) => cn(
                        styles.link, 
                        styleOverride.link,
                        ...(isActive ? [styles.activeLink, styleOverride.activeLink] : []),
                    )}
                    onClick={onRouteClick}
                >
                    <li>{text}</li>
                </NavLink>
            ))}
        </ul>
    </nav>
);

export default Navigation;

export const VerticalNavigation = (props: NavigationProps) => <Navigation {...props} styleOverride={verticalStyles} />;