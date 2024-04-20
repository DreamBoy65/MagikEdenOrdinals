const { EventEmitter } = require("events");

class Tokens extends EventEmitter {
    constructor(client, config) {
        super();
        this.client = client;
        this.config = config;

        this.kinds = [
            "transfer",
            "list",
            "delist",
            "buying_broadcasted",
            "mint_broadcasted",
            "create"
        ];
        this.rarity = [
            "common",
            "uncommon",
            "legendary",
            "mythic",
            "rare",
            "epic"
        ];
        this.sortBy = [
            "priceAsc",
            "priceDesc",
            "listedAtAsc",
            "listedAtDesc",
            "inscriptionNumberAsc",
            "inscriptionNumberDesc",
            "brc20UnitPriceAsc",
            "brc20UnitPriceDesc"
        ];

        this.events = {
            new: false,
            collectionsToWatchForNew: [],
            AddressesToWatchForNew: []
        };
        this.isEventsEnabled = false;
    }

    async handleEvents() {
        while (this.isEventsEnabled) {
            await this.newTokenForCollectionHandler();
            await this.newTokenForWalletHandler();
            await this.client.func.sleep(60);
        }
    }
    async newTokenForCollectionHandler() {
        for (const col of Array.isArray(this.events.collectionsToWatchForNew)
            ? this.events.collectionsToWatchForNew
            : []) {
            let tokens = await this.get({
                collectionSymbol: col,
                limit: 20
            });
            let oldTokens = (await this.client.db.get("tokensOf" + col)) ?? [];

            for (const token of tokens.tokens) {
                if (oldTokens.includes(token.id)) continue;

                this.emit("new", token);
            }

            await this.client.db.set(
                "tokensOf" + col,
                tokens.tokens.map(e => e.id)
            );

            await this.client.func.sleep(5);
        }
    }

    async newTokenForWalletHandler() {
        for (const ads of Array.isArray(this.events.AddressesToWatchForNew)
            ? this.events.AddressesToWatchForNew
            : []) {
            let tokens = await this.get({
                ownerAddress: ads,
                limit: 20
            });
            let oldTokens = (await this.client.db.get("tokensOf" + ads)) ?? [];

            for (const token of tokens.tokens) {
                if (oldTokens.includes(token.id)) continue;

                this.emit("new", token);
            }
            await this.client.db.set(
                "tokensOf" + ads,
                tokens.tokens.map(e => e.id)
            );

            await this.client.func.sleep(5);
        }
    }

    watch(events = {}) {
        Object.keys(events).forEach(e => {
            this.events[e] = events[e];
        });
        return true;
    }

    async startEvents() {
        this.emit("start");
        this.isEventsEnabled = true;
        return this.handleEvents();
    }

    async stopEvents() {
        this.emit("end");
        return (this.isEventsEnabled = false);
    }

    async get(opts = {}) {
        let str = "";
        Object.keys(opts).forEach(e => {
            str += e + "=" + opts[e] + "&";
        });

        return await this.client.fetch(`tokens${str ? "?" + str : ""}`);
    }
}

module.exports = Tokens;
