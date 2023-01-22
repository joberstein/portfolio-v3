const getEndpointStage = (): EndpointStage | void => {
    switch (process.env.NODE_ENV) {
        case "production":
            return "prod";
        case "development":
            return "dev";
        default:
            return;
    }
}

const endpointStage = getEndpointStage();
const SEND_MESSAGE_URL = endpointStage ? `${process.env.REACT_APP_MESSAGES_API_ENDPOINT}/${endpointStage}/messages` : undefined;

/**
 * Send a message with the given data.  Returns a promise with a boolean indicating if the send was successful or not.
 * @param data The body of the request as an object.
 * @returns {Promise<boolean>} indicating if the send was successful
 */
const sendMessage = (data: ContactFormData) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (!SEND_MESSAGE_URL) {
        throw new Error('Endpoint stage is missing.');
    }

    return fetch(SEND_MESSAGE_URL, requestOptions)
        .then(({status}) => status >= 200 && status < 400);
};

export default sendMessage;
