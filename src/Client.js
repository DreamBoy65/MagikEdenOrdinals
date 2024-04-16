const axios = require("axios");
const { EventEmitter } = require("events");
const Collection = require("./Collection");
const Activities = require("./Activities");
const Tokens = require("./Tokens");
const Block = require("./Block");

class MagikEden extends EventEmitter {
    constructor(config) {
        super();
        this.config = config;
        this.apiKey = config.key;
        this.isDebugTrue = config.debug;
    }

    collection(config) {
        return new Collection(this, config);
    }

    activities(config) {
        return new Activities(this, config);
    }

    tokens(config) {
        return new Tokens(this, config);
    }

    block(config) {
        return new Block(this, config);
    }

    debug(e) {
        this.emit("debug", e);
    }

    error(error) {
        return console.error(">>> [MAGIK EDEN ORD]: " + error);
    }

    fetch(url) {
        return axios({
            method: "GET",
            url: "https://api-mainnet.magiceden.dev/v2/ord/btc/" + url,
            headers: {
                Authorization: `Bearer ${this.apiKey}`
            }
        })
            .then(res => res.data)
            .catch(e => {
                this.debug(e);
                return null;
            });
    }
}

module.exports = MagikEden;
