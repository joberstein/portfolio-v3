import {useEffect} from "react";
import {withRouter} from "react-router";
import {scrollTo} from "windowUtils";

const ScrollToTop = ({ children, location: { pathname } }) => {
    useEffect(() => scrollTo(0, 0), [pathname]);
    return children || null;
};

export default withRouter(ScrollToTop);