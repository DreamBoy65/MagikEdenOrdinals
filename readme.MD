
  <img src="https://img.shields.io/npm/dt/magikedenordinals?style=for-the-badge">
  <img src="https://img.shields.io/npm/v/magikedenordinals?style=for-the-badge">
  <a href="https://discord.com/invite/zMpN575jyD"> <img src="https://img.shields.io/badge/Server-Invite-brightgreen" href="">
  </a>

# Table
- [API docs](https://docs.magiceden.io/reference/ordinals-overview)
- [Collection](#Collection)
- [Activities](#Activities)

# Start
```bash
npm i magikedenordinals
```

```js
const { Client } = require("magikedenordinals")

const client = new Client({
key: <your magikeden api key>,
debug: true, // debug
})

client.on("debug", console.log)
```

# Collection
+ get
```js
let collection = client.collection()
let data = await collection.get("<symbol>") // collection symbol
console.log(data)
```

+ popular
```js
let collection = client.collection()
let data = await collection.popular("<window>", "<limit>")
// windows option: ["1h", "6h", "1d", "7d", "30d"];
// limit: less than 100 and multiple of 12;

console.log(data)
```

+ all
```js
let collection = client.collection()
let data = await collection.all() // all collections
console.log(data)
```

+ stat
```js
let collection = client.collection()
let data = await collection.stat("<symbol>") // collection symbol
console.log(data)
```

# Activities
+ all
```js
let activities = client.activities()
let data = await activities.all()
// options: limit

console.log(data)
```

+ get
```js
let activities = client.activities()
let data = activities.get(options)
/*
let = options = {
  collectionSymbol = "dream",
  kind = "buying_broadcasted",
  limit,
  ownerAddress,
  satRarity,
  inscriptionMin,
  inscriptionMax
}

let kinds = [
  "transfer",
  "list",
  "delist",
  "buying_broadcasted",
  "mint_broadcasted",
  "create"
];

let rarity = [
  "common",
  "uncommon",
  "legendary",
  "mythic",
  "rare",
  "epic"
];
*/

console.log(data)
```

# Tokens
+ get 
```js
let tokens = client.tokens()
let data = await tokens.get(option)

/*
options = {
  sortBy,
  kind,
  satRarity,
  limit,
  collectionSymbol
}

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
*/

console.log(data)
```

# Block 
+ activities
```js
const block = client.block()
let data = block.activities(options)

/* 
let options = {
  kind,
  blockHeight
}

this.kinds = ["create", "transfer"];
*/

console.log(data)
```