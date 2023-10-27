import { render } from '@testing-library/react';
import About, { data } from "./component";

const renderComponent = () => render(<About />);

describe("src/About/component", () => {
    it("Has the correct header", () => {
        const component = renderComponent();
        expect(component.queryByText("About")).toBeTruthy();
    });

    it("Has topics", () => {
        const component = renderComponent();

        Object.keys(data).forEach(topic => 
            expect(component.queryByText(topic)).toBeTruthy()
        );
    });

    Object.keys(data).forEach(topic => {
        it(`Has items for topic: ${topic}`, () => {
            const component = renderComponent();
    
            data[topic].forEach(item => 
                expect(component.queryByText(item)).toBeTruthy()
            );
        });
    });
});