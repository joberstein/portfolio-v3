import React from "react";
import {shallow} from "enzyme";
import Analytics from "./component";
import * as AnalyticsService from "./service";

jest.mock("./service.js");

const props = {
    location: {
        pathname: "/test", 
        search: "?words=true"
    }
};

const render = () => shallow(<Analytics {...props} />);

test("Does not render any visible content", () => {
    const rendered = render();
    expect(rendered.isEmptyRender()).toBe(true);
});

test("Records a page view on mount", () => {
    render();
    expect(AnalyticsService.recordPageView).toHaveBeenCalledWith("/test?words=true");
});

describe("Updating the location property", () => {

    test("Records a page view if the pathname changes", () => {
        const rendered = render();
        expect(AnalyticsService.recordPageView).toHaveBeenCalledWith("/test?words=true");

        rendered.setProps({
            location: {
                ...props.location, 
                pathname: "/changed"
            }
        });
        
        expect(AnalyticsService.recordPageView).toHaveBeenCalledWith("/changed?words=true");
        expect(AnalyticsService.recordPageView).toHaveBeenCalledTimes(2);
    });

    test("Records a page view if the search changes", () => {
        const rendered = render();
        expect(AnalyticsService.recordPageView).toHaveBeenCalledWith("/test?words=true");
        
        rendered.setProps({
            location: {
                ...props.location, 
                search: "?"
            }
        });

        expect(AnalyticsService.recordPageView).toHaveBeenCalledWith("/test?");
        expect(AnalyticsService.recordPageView).toHaveBeenCalledTimes(2);
    });
});