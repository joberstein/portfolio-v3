import { renderHook } from '@testing-library/react-hooks';
import useAnalytics from "./hook";
import * as AnalyticsService from "./service";

jest.mock("./service.js");

let props;

describe("src/Analytics/hook", () => {
    beforeEach(() => {
        props = {
            pathname: "/test",
            search: "?words=true",
        };
    });

    it("Records a page view on mount", () => {
        renderHook(() => useAnalytics(props));
    
        expect(AnalyticsService.recordPageView).toHaveBeenCalled();
        expect(AnalyticsService.recordPageView).toHaveBeenCalledWith("/test?words=true");
    });
    
    describe("Updating the location property", () => {
        it("Records a page view if the pathname changes", () => {
            const { rerender } = renderHook(() => useAnalytics(props));
            props.pathname = "/changed";
            rerender();
        
            expect(AnalyticsService.recordPageView).toHaveBeenCalledTimes(2);
            expect(AnalyticsService.recordPageView).toHaveBeenCalledWith("/test?words=true");
            expect(AnalyticsService.recordPageView).toHaveBeenCalledWith("/changed?words=true");
        });
    
        it("Records a page view if the search changes", () => {
            const { rerender } = renderHook(() => useAnalytics(props));
            props.search = "?changed=true";
            rerender();
    
            expect(AnalyticsService.recordPageView).toHaveBeenCalledTimes(2);
            expect(AnalyticsService.recordPageView).toHaveBeenCalledWith("/test?words=true");
            expect(AnalyticsService.recordPageView).toHaveBeenCalledWith("/test?changed=true");
        });
    });
});