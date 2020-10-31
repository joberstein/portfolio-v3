// React-GA: https://github.com/react-ga/react-ga#api

import GoogleAnalytics from "react-ga";
import {isLocalhost} from "windowUtils";

const GA_TRACKING_CODE = "UA-145898568";
const GA_CONFIG = {
    gaOptions: {
        siteSpeedSampleRate: 100
    }
};

export const initializeAnalytics = () => {
    const propertyValue = isLocalhost() ? 2 : 1;
    const trackingCode = `${GA_TRACKING_CODE}-${propertyValue}`;
    
    GoogleAnalytics.initialize(trackingCode, GA_CONFIG);
};

export const recordPageView = page => {
    GoogleAnalytics.set({page});
    GoogleAnalytics.pageview(page);
};

const recordEvent = (action, label, category, nonInteraction=false) =>
    GoogleAnalytics.event({action, category, label, nonInteraction});

export const recordInteraction = (action, label, category) =>
    recordEvent(action, label, category);

export const recordNonInteractionEvent = (action, label, category) =>
    recordEvent(action, label, category, true);