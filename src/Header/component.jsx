import Navigation from "Navigation/component";
import styles from "./styles.module.scss";
import Media from "react-media";
import Menu from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { getLinks, LinkTypes } from "Navigation/util";
import { useState } from "react";

const baseLinks = getLinks({ type: LinkTypes.Base });

const Header = () => {
    const [shouldShowNavigation, setShouldShowNavigation] = useState(false);
    const toggleNavigation = () => setShouldShowNavigation(!shouldShowNavigation);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <NavLink end to="/" className={styles.logo}>
                    Jesse Oberstein
                </NavLink>

                <div className={styles.navigationToggle} onClick={toggleNavigation}>
                    <Menu/>
                </div>

                <Media query={{maxWidth: "768px"}}>
                    {matches => (!matches || shouldShowNavigation) && (
                        <div className={styles.links}>
                            <Navigation links={baseLinks} onRouteClick={toggleNavigation}/>
                        </div>
                    )}
                </Media>
            </div>
        </header>
    );
}

Header.defaultProps = {
    ...Navigation.defaultProps
};

Header.propTypes = {
    ...Navigation.propTypes
};

export default Header;