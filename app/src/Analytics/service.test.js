import GoogleAnalytics from "react-ga";
import * as windowUtils from "windowUtils";
import * as analyticsService from "Analytics/service";

jest.mock("react-ga");
jest.mock("windowUtils");

describe("Initializing analytics", () => {
    test("Not on localhost", () => {
        analyticsService.initializeAnalytics();
        
        expect(GoogleAnalytics.initialize).toHaveBeenCalledWith("UA-145898568-1", expect.anything());
    });

    test("On localhost", () => {
        windowUtils.isLocalhost.mockReturnValue(true);
        analyticsService.initializeAnalytics();
        
        expect(GoogleAnalytics.initialize).toHaveBeenCalledWith("UA-145898568-2", expect.anything());
    });
});

test("Records page view", () => {
    const page = "/example?test=words";
    analyticsService.recordPageView(page);

    expect(GoogleAnalytics.set).toBeCalledWith({page});
    expect(GoogleAnalytics.pageview).toBeCalledWith(page);
});

describe("Recording events", () => {
    const [action, label, category] = ["exampleAction", "exampleLabel", "exampleCategory"];

    test("Interactions", () => {
        const event = {action, label, category, nonInteraction: false};
        analyticsService.recordInteraction(action, label, category);

        expect(GoogleAnalytics.event).toBeCalledWith(event);
    });

    test("Non-Interactions", () => {
        const event = {action, label, category, nonInteraction: true};
        analyticsService.recordNonInteractionEvent(action, label, category);

        expect(GoogleAnalytics.event).toBeCalledWith(event);
    });
});