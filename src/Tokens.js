class Tokens {
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
    }

    async get(opts = {}) {
        let str = "";
        Object.keys(opts).forEach(e => {
            str += e + "=" + opts[e];
        });

        return await this.client.fetch(`tokens${str ? "?" + str : ""}`);
    }
}

module.exports = Tokens;
