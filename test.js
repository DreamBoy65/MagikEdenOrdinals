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
    let collections = client.collection();
    await collections.watch({
        new: true
    });

    collections.on("start", () => {
        console.log("collections alert started");
    });
    
    collections.on("new", newcol => {
        console.log(newcol)
    });

    await collections.startEvents();
    
    
})();
