class Block {
    constructor(client, config) {
        this.client = client;
        this.config = config;

        this.kinds = ["create", "transfer"];
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
