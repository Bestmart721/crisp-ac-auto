const CrispListener = require("./crispListener");
const ACInstance = require("./acInstance");

const emailChanged = data => {
  sessionToUserMap[data.session_id] = data.email;
  console.log('CP: Set email :', data.email)
  fs.writeFileSync(filePath, JSON.stringify(sessionToUserMap))
  const contactData = {
    email: data.email,
  };
  addOrUpdateContact(contactData);
}

const nicknameChanged = data => {
  data.email = sessionToUserMap[data.session_id];
  console.log('CP Set ' + data.email + ' nickname :', data.nickname)
  // Example contact data to be added or updated
  const contactData = {
    email: data.email,
    firstName: data.nickname.split(' ')[0],
    lastName: data.nickname.split(' ')[1],
    // Add any other fields as needed
  };

  // Add or update the contact
  addOrUpdateContact(contactData);
}

const phoneChanged = data => {
  data.email = sessionToUserMap[data.session_id];
  console.log('CP: Set ' + data.email + ' phone :', data.phone)
  const contactData = {
    email: data.email,
    phone: data.phone,
  };
  addOrUpdateContact(contactData);
}

CrispListener.on("session:set_email", emailChanged);
CrispListener.on("session:set_nickname", nicknameChanged)
CrispListener.on("session:set_phone", phoneChanged);

// Function to check if a contact exists with the provided session ID in ActiveCampaign
const checkContactExists = (email, cb) => {
  console.log('AC: Checking if exists :', email)
  ACInstance.get('/contacts', {
    params: {
      search: email // Specify the field name you want to search
    }
  }).then(response => {
    cb(response.data.contacts.length > 0, response.data.contacts[0])
  }).catch(err => {
    cb(false)
  })
}

// Function to add or update a contact on ActiveCampaign
const addOrUpdateContact = contactData => {
  // console.log(contactData)
  checkContactExists(contactData.email, (sessionIdExists, data) => {
    if (sessionIdExists) {
      console.log('AC: Updating ' + contactData.email + ' ...')
      // Contact exists, update specific fields
      ACInstance.put(`/contacts/${data.id}`, { contact: contactData }).then(() => {
        console.log('AC: Updated ' + contactData.email + ' successfully.');
      }).catch(err => {
        // console.log(err)
      })

    } else {
      console.log('AC: Adding ' + contactData.email + ' ...')
      // Contact does not exist, add a new contact
      ACInstance.post('/contacts', { contact: contactData }).then(() => {
        console.log('AC: Added ' + contactData.email + ' successfully.');
      }).catch(err => {
        // console.log(err)
      })
    }
  })
}

const fs = require('fs')
const filePath = 'sessions.json'; // Path to the file
// Map to store session ID to user ID mapping
var sessionToUserMap = {}
// Check if the file exists
if (fs.existsSync(filePath)) {
  // File exists, read it synchronously
  const data = fs.readFileSync(filePath, 'utf8');
  sessionToUserMap = JSON.parse(data)
} else {
  // File doesn't exist, create it
  fs.writeFileSync(filePath, '{}');
}
