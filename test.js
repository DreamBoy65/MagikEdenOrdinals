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
    let token = client.tokens();
    await token.watch({
        new: true,
        collectionsToWatchForNew: ["bbc"],
        AddressesToWatchForNew: ["bbc"],
    });

    token.on("start", () => {
        console.log("Activities alert started");
    });

    token.on("end", () => {
        console.log("Activities alert ended");
    });

    token.on("new", a => {
        console.log(a);
    });

    await token.startEvents();
})();
