import { useState } from "react";
import { NavLink } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Menu from "@mui/icons-material/Menu";
import Navigation from "Navigation/component";
import { getRouteMapping, RouteType } from "Navigation/util";
import styles from "./styles.module.scss";

const baseLinksMapping = getRouteMapping({ type: RouteType.Base });

const Header = () => {
    const [shouldShowNavigation, setShouldShowNavigation] = useState(false);
    const toggleNavigation = () => setShouldShowNavigation(!shouldShowNavigation);
    const isDesktop = useMediaQuery("(min-width: 769px)");

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <NavLink end to="/" className={styles.logo}>
                    Jesse Oberstein
                </NavLink>

                <div className={styles.navigationToggle} onClick={toggleNavigation}>
                    <Menu/>
                </div>

                {(isDesktop || shouldShowNavigation) && (
                    <div className={styles.links}>
                        <Navigation linksMapping={baseLinksMapping} onRouteClick={toggleNavigation}/>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;