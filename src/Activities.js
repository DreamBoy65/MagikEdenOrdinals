class Activites {
    constructor(client, config) {
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
    }

    async all(limit = 20) {
        return await this.client.fetch(`
      activities/trades?limit=${limit}`);
    }

    async get(opts = {}) {
        let {
            collectionSymbol = "dream",
            kind = "buying_broadcasted",
            limit,
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
