const { EventEmitter } = require("events");

class Activites extends EventEmitter {
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
        this.events = {
            new: false,
            collectionsToWatchForNew: []
        };
        this.isEventsEnabled = false;
    }

    async handleEvents() {
        while (this.isEventsEnabled) {
            await this.newActsHandler();
            await this.client.func.sleep(60);
        }
    }
    async newActsHandler() {
        for (const e of Array.isArray(this.events.collectionsToWatchForNew)
            ? this.events.collectionsToWatchForNew
            : []) {
            let acts = await this.getOfAllKinds(e, {
                limit: 20
            });

            let oldActs = (await this.client.db.get("ActsOf" + e)) ?? [];

            for (const act of acts.activities) {
                if (oldActs.includes(act.tokenId)) continue;
                this.emit("new", act);
            }

            await this.client.db.set(
                "ActsOf" + e,
                acts.activities.map(e => e.tokenId)
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

    async all(limit = 20) {
        return await this.client.fetch(`
      activities/trades?limit=${limit}`);
    }

    async get(opts = {}) {
        let {
            collectionSymbol = "dream",
            kind = "buying_broadcasted",
            limit = 20,
            ownerAddress,
            satRarity,
            inscriptionMin,
            inscriptionMax
        } = opts;

        let str = [];

        if (kind) {
            if (!this.kinds.includes(kind))
                return this.client.error(
                    "Invalid kind, options: " + this.kinds.join(", ")
                );

            str.push("kind=" + kind);
        }

        if (satRarity) {
            if (!this.rarity.includes(satRarity))
                return this.client.error(
                    "Invalid satRarity, options: " + this.rarity.join(", ")
                );
            str.push("satRarity=" + satRarity);
        }

        Object.keys(opts).forEach(e => {
            if (["satRarity", "kind"].includes(e)) return;

            str.push(e + "=" + opts[e]);
        });

        return await this.client.fetch(`activities?${str.join("&")}`);
    }

    async getOfAllKinds(symbol, opts = {}) {
        if (!symbol) return this.client.error("No symbol given.");

        let promises = this.kinds.map(e =>
            this.get({
                collectionSymbol: symbol,
                kind: e,
                ...opts
            })
        );
        promises = await Promise.all(promises);
        promises = promises.map(e => e.activities);

        return { activities: [].concat(...promises) };
    }
}

module.exports = Activites;
