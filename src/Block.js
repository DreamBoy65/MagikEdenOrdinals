class Block {
    constructor(client, config) {
        this.client = client;
        this.config = config;

        this.kinds = ["create", "transfer"];
        this.events = {
            new: false
        };
        this.isEventsEnabled = false;
    }

    async newActivitiesHandler() {}

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
            await this.newActivitiesHandler();
            await this.client.func.sleep(60);
        }
    }

    async watch(events = {}) {
        Object.keys(events).forEach(e => {
            this.events[e] = events[e];
        });
        return true;
    }

    async activities(opts = {}) {
        if (!opts.blockHeight) {
            opts.blockHeight = 12;
        }

        let str = "";
        Object.keys(opts).forEach(e => {
            str += e + "=" + opts[e];
        });

        return await this.client.fetch(`block/activites{str ? "?" + str : ""}`);
    }
}
module.exports = Block;
