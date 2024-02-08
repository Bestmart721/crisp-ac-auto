// const CrispClient = require('crisp-api').CrispClient;

// // Initialize CrispClient with your Crisp credentials
// const client = new CrispClient({
//     websiteId: 'e19488c2-26aa-4a88-95cd-1d7215c6e56f', // Replace <your_website_id> with your actual Crisp website ID
//     token: 'cf33736e6a478f0220850c9d459c56908ec2d77779da9283ef9f851f547a92d6' // Replace <your_crisp_access_token> with your actual Crisp access token
// });

// // Function to fetch contact information using session ID
// async function getContactInformation(sessionId) {
//     try {
//         // Fetch user ID associated with session ID
//         const sessionData = await client.session.get(sessionId);
//         const userId = sessionData.data.user.id;

//         // Fetch contact information associated with user ID
//         const contactInfo = await client.user.get(userId);

//         return contactInfo;
//     } catch (error) {
//         throw error;
//     }
// }

// // Example usage
// const sessionId = 'session_6011a737-e7d6-419b-af85-bf63872beae0'; // Replace 'your_session_id' with the actual session ID you want to fetch data for

// getContactInformation(sessionId)
//     .then(contactInfo => {
//         console.log('Contact Information:', contactInfo);
//     })
//     .catch(error => {
//         console.error('Error fetching contact information:', error);
//     });

const axios = require('axios');

async function getContactInformation(sessionId) {
    try {
        const sessionResponse = await axios.get(`https://api.crisp.chat/v1/sessions/${sessionId}`);
        const userId = sessionResponse.data.data.user.id;

        const userResponse = await axios.get(`https://api.crisp.chat/v1/user_profiles/${userId}`);
        return userResponse.data.data;
    } catch (error) {
        throw error;
    }
}

// Example usage
const sessionId = 'session_6011a737-e7d6-419b-af85-bf63872beae0'; // Replace 'your_session_id' with the actual session ID you want to fetch data for

getContactInformation(sessionId)
    .then(contactInfo => {
        console.log('Contact Information:', contactInfo);
    })
    .catch(error => {
        console.error('Error fetching contact information:', error);
    });