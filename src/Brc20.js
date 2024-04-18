const { EventEmitter } = require("events");

class Brc20 extends EventEmitter {
  constructor(client, options){
    this.options = options;
    this.client = client
  }
}

module.exports = Brc20