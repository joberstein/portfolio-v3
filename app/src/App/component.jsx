import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import styles from './styles.module.scss';
import Header from "Header/component";
import Footer from "Footer/component";
import Home from "Home/component";
import About from "About/component";
import Portfolio from "Portfolio/component";
import Contact from "Contact/component";
import ScrollToTop from "ScrollToTop/component";
import NotFound from "NotFound/component";
import {createRouteLink} from "Navigation/component";

const routes = [
    createRouteLink("/", "Home", Home),
    createRouteLink("/about", "About", About),
    createRouteLink("/portfolio", "Portfolio", Portfolio),
    createRouteLink("/contact", "Contact", Contact)
];

const App = () => (
    <div className={styles.app}>
        <Router basename={process.env.PUBLIC_URL}>
            <ScrollToTop/>
            <Header routes={routes} />
            <Switch>
                {routes.map(renderRoute)}
                <Route component={NotFound} />
            </Switch>
            <Footer/>
        </Router>
    </div>
);

const renderRoute = ({path, component}) => (
    <Route exact={path === "/"} key={path} path={path} component={component} />
);

export default App;