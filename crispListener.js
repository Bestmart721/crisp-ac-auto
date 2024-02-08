const Crisp = require("crisp-api");

// Crisp keys
const token_identifier = "795c8059-611d-4d1c-a301-e326f6921ffe";
const token_key = "01d7eeec461fbdeb9a4253dc5878369f0293879a0cfa633d6e663f796763d6d7";

// Create the Crisp client (it lets you access both the REST API and RTM events)
const CrispClient = new Crisp();
// Configure your Crisp authentication tokens ('plugin' token)
CrispClient.authenticateTier("plugin", token_identifier, token_key);
// CrispClient.authenticate(token_identifier, token_key);
CrispClient.setRtmMode(Crisp.RTM_MODES.WebSockets);

module.exports = CrispClient;