const { Client } = require("./index.js");
require("dotenv").config();

const apiKey = process.env.key;
const client = new Client({
    key: apiKey,
    debug: true
});

client.on("debug", e => {
    console.log(e.response.data.error);
});

(async () => {
    let data = await client.activities().getOfAllKinds("bbc");
    console.log(data);
})();
