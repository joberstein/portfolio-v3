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

/**
 * Send a message with the given data.  Returns a promise with a boolean indicating if the send was successful or not.
 * @param data The body of the request as an object.
 * @returns {Promise<boolean>} indicating if the send was successful
 */
export const sendMessage = (data: ContactFormData) => {
    const endpointStage = getEndpointStage();

    if (!endpointStage) {
        throw new Error('Endpoint stage is missing.');
    }
    
    const url = `${process.env.REACT_APP_MESSAGES_API_ENDPOINT}/${endpointStage}/messages`;

    const requestOptions: RequestInit = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, requestOptions)
        .then(({status}) => status >= 200 && status < 400)
        .catch(e => {
            console.error(e);
            return false;
        });
};

export const getCaptchaToken = async ({ executeRecaptcha, action }: GetCaptchaTokenArgs): Promise<string> => {
    if (!executeRecaptcha) {
        console.warn('Execute recaptcha not yet available');
        return "";
    }

    try {
        return await executeRecaptcha(action);
    } catch (e) {
        console.error(e);
        return "";
    }
}
