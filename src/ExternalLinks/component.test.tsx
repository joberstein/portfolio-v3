import ExternalLinks from "./component";
import * as analyticsService from "Analytics/service";
import { fireEvent, render } from "@testing-library/react";

let links: SiteLink[];

const renderComponent = () => render(
    <ExternalLinks links={links} />
);

describe("src/components/ExternalLinks", () => {
    const recordInteraction = jest.spyOn(analyticsService, "recordInteraction");

    beforeEach(() => {
        links = [];
    });

    it("Renders an empty component without links", () => {
        const component = renderComponent();
        const linkElements = component.queryAllByRole("a");
        expect(linkElements).toHaveLength(0);
    });

    it("Renders a component with links", () => {
        links = [
            {
                path: "/",
                text: "Home",
            },
            {
                path: "/test",
                text: "Test",
            }
        ];

        const component = renderComponent();
        const anchorElements = component.queryAllByRole("link");
        expect(anchorElements).toHaveLength(links.length);

        const [homeAnchor, testAnchor] = anchorElements;
        expect(homeAnchor).toHaveAttribute("href", "/");
        expect(testAnchor).toHaveAttribute("href", "/test");

        anchorElements.forEach(fireEvent.click);
        expect(recordInteraction).toHaveBeenCalledTimes(links.length);

        links.forEach(({ text }) => {
            expect(recordInteraction).toHaveBeenCalledWith({
                label: text,
                action: "click",
                category: "link",
            });
        });
    });
});