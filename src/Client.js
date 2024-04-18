const axios = require("axios");
const { EventEmitter } = require("events");
const Collection = require("./Collection");
const Activities = require("./Activities");
const Tokens = require("./Tokens");
const Block = require("./Block");
const Brc20 = require("./Brc20");
const Functions = require("../function");
const Jsoning = require("jsoning");

class MagikEden extends EventEmitter {
    constructor(config) {
        super();
        this.config = config;
        this.apiKey = config.key;
        this.isDebugTrue = config.debug;
        this.func = Functions;
        this.db = new Jsoning(".magikedenordinals.json");
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

    brc20(config) {
        return new Brc20(this, config);
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
