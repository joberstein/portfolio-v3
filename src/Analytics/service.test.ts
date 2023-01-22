import GoogleAnalytics from "react-ga";
import * as windowUtils from "windowUtils";
import * as analyticsService from "Analytics/service";

jest.mock("react-ga");

describe("Initializing analytics", () => {
    const isLocalhost = jest.spyOn(windowUtils, 'isLocalhost');
    
    beforeEach(() => {
        isLocalhost.mockReturnValue(true);
    });

    it("Not on localhost", () => {
        isLocalhost.mockReturnValue(false);
        analyticsService.initializeAnalytics();
        
        expect(GoogleAnalytics.initialize).toHaveBeenCalledWith("UA-145898568-1", expect.anything());
    });

    it("On localhost", () => {
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
        analyticsService.recordInteraction(event);

        expect(GoogleAnalytics.event).toBeCalledWith(event);
    });

    test("Non-Interactions", () => {
        const event = {action, label, category, nonInteraction: true};
        analyticsService.recordNonInteractionEvent(event);

        expect(GoogleAnalytics.event).toBeCalledWith(event);
    });
});