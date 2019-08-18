import GoogleAnalytics from "react-ga";

const GA_TRACKING_CODE = "UA-145898568";

const getTrackingCode = () => {
    const propertyValue = "localhost" === window.location.hostname ? 2 : 1;
    return `${GA_TRACKING_CODE}-${propertyValue}`;
};

export const initializeAnalytics = () =>
    GoogleAnalytics.initialize(getTrackingCode(), {
        gaOptions: {
            siteSpeedSampleRate: 100
        }
    });

export const recordPageView = page => {
    GoogleAnalytics.set({page});
    GoogleAnalytics.pageview(page);
};

export const recordEvent = (action, label, category, nonInteraction=false) =>
    GoogleAnalytics.event({action, category, label, nonInteraction});

export const recordNonInteractionEvent = (action, label, category) =>
    recordEvent(action, label, category, true);