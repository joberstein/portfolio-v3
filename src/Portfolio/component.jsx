import React from "react";
import {Route, Switch} from "react-router-dom";
import styles from "./styles.module.scss";
import Navigation from "Navigation/component";
import PortfolioSection from "PortfolioSection/component";
import NotFound from "NotFound/component";
import animation from "./animation/data";
import apps from "./apps/data";
import drawing from "./drawing/data";
import games from "./games/data";
import websites from "./websites/data";

const createRoute = ({id, data}) => ({
    path: `/${id}`,
    linkText: id.toUpperCase().slice(0, 1) + id.slice(1),
    data
});

const routes = [drawing, apps, games, animation, websites].map(createRoute);

class Portfolio extends React.Component {

    constructor(props) {
        super(props);
        this.onLocationChanged();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location !== this.props.location) {
            this.onLocationChanged();
        }
    }

    onLocationChanged() {
        const {location, match, history} = this.props;
        if (location.pathname === match.path) {
            const randomRoute = routes[Math.floor(Math.random() * routes.length)];
            history.replace(`${match.path}${randomRoute.path}`);
        }
    }

    render() {
        return (
            <Switch>
                {routes.map(this.renderRoute)}
                <Route component={NotFound} />
            </Switch>
        );
    }

    renderRoute = ({path, data}) => (
        <Route key={path}
               path={`${this.props.match.path}${path}`}
               render={() => (
                   <div className={styles.portfolio}>
                       <h1>Portfolio</h1>
                       <div className={styles.links}>
                           <Navigation routes={routes} basePath={this.props.match.path}/>
                       </div>
                       <PortfolioSection data={data} path={path} />
                   </div>
                )} />
    )
}

export default Portfolio;