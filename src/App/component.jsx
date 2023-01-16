import React, {useEffect} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import styles from './styles.module.scss';
import Header from "Header/component";
import Footer from "Footer/component";
import useAnalytics from "Analytics/hook";
import Home from "Home/component";
import About from "About/component";
import Portfolio from "Portfolio/component";
import Contact from "Contact/component";
import NotFound from "NotFound/component";
import {scrollTo} from "windowUtils";
import { Route, Routes, useLocation } from 'react-router';
import PortfolioSection from 'PortfolioSection/component';

const App = () => {
    const location = useLocation();
    useAnalytics(location);

    useEffect(() => {
        scrollTo(0, 0);
    }, [ location.pathname ]);

    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="portfolio" element={<Portfolio />}>
                    <Route path=":sectionId" element={<PortfolioSection />} />
                </Route>
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer/>
        </>
    );
}

const AppWrapper = () => (
    <div className={styles.app}>
        <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_CLIENT_KEY ?? ''}>
            <Router basename={process.env.PUBLIC_URL}>
                <App />
            </Router>
        </GoogleReCaptchaProvider>
    </div>
);

export default AppWrapper;