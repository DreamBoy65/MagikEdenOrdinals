class Collection {
    constructor(client, config) {
        this.client = client;
        this.config = config;
        
        this.windows = ["1h", "6h", "1d", "7d", "30d"];
    }

    async get(symbol) {
        return await this.client.fetch(`collections/${symbol}`);
    }

    async popular(window = "1h", limit = "12") {
        if (limit > 100 || limit % 12 !== 0)
            return this.client.error(
                "Invalid limit, must be less than 100 and must be multiple of 12"
            );

        if (!this.windows.includes(window))
            return this.client.error(
                "Invalid window!, options: " + windows.join(", ")
            );

        return await this.client.fetch(
            `popular_collections?window=${window}&limit=${limit}`
        );
    }

    async all(opts) {
        return await this.client.fetch(`collections${opts ?? ""}`);
    }

    async stat(symbol) {
        return await this.client.fetch(`stat?collectionSymbol=${symbol}`);
    }
}

module.exports = Collection;
