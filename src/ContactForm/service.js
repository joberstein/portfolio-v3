
const SEND_MESSAGE_URL = "https://agegdkw9wk.execute-api.us-east-1.amazonaws.com/production/messages";

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
