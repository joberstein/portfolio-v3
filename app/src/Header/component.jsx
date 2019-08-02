import React from "react";
import Navigation from "Navigation/component";
import styles from "./styles.module.scss";
import Media from "react-media";
import Menu from "@material-ui/icons/Menu";
import {NavLink} from "react-router-dom";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {shouldShowNavigation: false};
        this.toggleNavigation = this.toggleNavigation.bind(this);
    }

    render() {
        return (
            <header className={styles.header}>
                <div className={styles.container}>
                    <NavLink exact to="/" className={styles.logo}>
                        Jesse Oberstein
                    </NavLink>

                    <div className={styles.navigationToggle} onClick={this.toggleNavigation}>
                        <Menu/>
                    </div>

                    <Media query={{maxWidth: "768px"}}>
                        {matches => (!matches || this.state.shouldShowNavigation) && (
                            <div className={styles.links}>
                                <Navigation routes={this.props.routes} onRouteClick={this.toggleNavigation}/>
                            </div>
                        )}
                    </Media>
                </div>
            </header>
        );
    }

    toggleNavigation() {
        this.setState({shouldShowNavigation: !this.state.shouldShowNavigation});
    }
}

Header.defaultProps = {
    ...Navigation.defaultProps
};

Header.propTypes = {
    ...Navigation.propTypes
};

export default Header;