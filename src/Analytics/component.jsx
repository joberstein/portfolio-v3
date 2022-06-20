import React from 'react';
import PropTypes from 'prop-types';
import {recordPageView} from "./service";

class Analytics extends React.Component {

    componentDidMount() {
        const {pathname, search} = this.props.location;
        recordPageView(pathname + search);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {pathname, search} = this.props.location;
        const prevLocation = prevProps.location;

        if (prevLocation.pathname !== pathname || prevLocation.search !== search) {
            recordPageView(pathname + search)
        }
    }

    render() {
        return null;
    }
}

Analytics.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string
    }).isRequired
};

export default Analytics;