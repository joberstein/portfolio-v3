import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import {NavLink} from "react-router-dom";
import styles from "./styles.module.scss";
import verticalStyles from "./styles-vertical.module.scss";

const Navigation = ({routes, basePath, onRouteClick, styleOverride}) => (
    <nav className={cn(styles.navigation, styleOverride.navigation)}>
         <ul className={cn(styles.links, styleOverride.links)}>
            {routes.map(route => (
                <NavLink exact={(basePath + route.path) === "/"}
                         to={basePath + route.path}
                         key={route.path}
                         className={cn(styles.link, styleOverride.link)}
                         activeClassName={cn(styles.activeLink, styleOverride.activeLink)}
                         onClick={onRouteClick}>
                    <li>
                        {route.linkText}
                    </li>
                </NavLink>
            ))}
        </ul>
    </nav>
);

Navigation.defaultProps = {
    basePath: "",
    routes: [],
    onRouteClick: () => {},
    styleOverride: {}
};

Navigation.propTypes = {
    basePath: PropTypes.string,
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string,
            linkText: PropTypes.string
        })
    ),
    onRouteClick: PropTypes.func
};

export default Navigation;

export const createRouteLink = (path, linkText, component) => ({path, linkText, component});
export const createLink = (path, linkText) => ({path, linkText});

export const VerticalNavigation = props => <Navigation {...props} styleOverride={verticalStyles} />;