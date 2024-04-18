const { EventEmitter } = require("events");

class Collection extends EventEmitter {
    constructor(client, config) {
        super();

        this.client = client;
        this.config = config;

        this.windows = ["1h", "6h", "1d", "7d", "30d"];
        this.events = {
            new: false
        };
        this.isEventsEnabled = false;
    }

    async newCollectionHandler() {
        let oldCols = (await this.client.db.get("collections")) ?? [];
        let newCols = (await this.all()) ?? [];
        newCols = newCols.slice(0, 20);

        for (const col of newCols) {
            if (oldCols.includes(col.symbol)) continue;
            this.emit("new", col);
        }

        let colsToAdd = newCols.map(e => e.symbol);
        await this.client.db.set("collections", colsToAdd);
        return;
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

    async handleEvents() {
        while (this.isEventsEnabled) {
            await this.newCollectionHandler();
            await this.client.func.sleep(60);
        }
    }

    async watch(events = {}) {
        Object.keys(events).forEach(e => {
            this.events[e] = events[e];
        });
        return true;
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
        return await this.client.fetch(`collections${"?" + opts ?? ""}`);
    }

    async stat(symbol) {
        return await this.client.fetch(`stat?collectionSymbol=${symbol}`);
    }
}

module.exports = Collection;
