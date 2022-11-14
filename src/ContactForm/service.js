
const getEndpointStage = () => {
    switch (process.env.NODE_ENV) {
        case "production":
            return "prod";
        case "development":
            return "dev";
        default:
            return "";
    }
}

const SEND_MESSAGE_URL = `${process.env.REACT_APP_MESSAGES_API_ENDPOINT}/${getEndpointStage()}/messages`;

/**
 * Send a message with the given data.  Returns a promise with a boolean indicating if the send was successful or not.
 * @param data The body of the request as an object.
 * @returns {Promise<boolean>} indicating if the send was successful
 */
const sendMessage = data => {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(SEND_MESSAGE_URL, requestOptions)
        .then(({status}) => status >= 200 && status < 400);
};

export default sendMessage;
