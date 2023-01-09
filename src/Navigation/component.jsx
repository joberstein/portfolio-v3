import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./styles.module.scss";
import verticalStyles from "./styles-vertical.module.scss";
import { NavLink } from "react-router-dom";

const Navigation = ({links, onRouteClick, styleOverride}) => (
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

Navigation.defaultProps = {
    basePath: "",
    links: {},
    onRouteClick: () => {},
    styleOverride: {}
};

Navigation.propTypes = {
    basePath: PropTypes.string,
    links: PropTypes.object,
    onRouteClick: PropTypes.func
};

export default Navigation;

export const createRouteLink = (path, linkText, component) => ({path, linkText, component});
export const createLink = (path, linkText) => ({path, linkText});

export const VerticalNavigation = props => <Navigation {...props} styleOverride={verticalStyles} />;