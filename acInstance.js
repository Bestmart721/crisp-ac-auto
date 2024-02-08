const axios = require('axios');

// ActiveCampaign keys
const baseURL = 'https://vivafunders.api-us1.com/api/3';
const apiKey = 'b23d49aac4f866cc99f8d7c6815a4546a96f7479c25452c8c53340cbe5750e2388d0f36f';

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Api-Token': apiKey,
        'Content-Type': 'application/json'
    }
});

module.exports = axiosInstance;