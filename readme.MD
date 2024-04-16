<p ="center">
   <img src="https://img.shields.io/npm/dt/discord-welcome-bot?style=for-the-badge">
   <img src="https://img.shields.io/npm/v/discord-welcome-bot?style=for-the-badge">
   <a href = "https://discord.gg/7UQaVPBQka" > <img src="https://img.shields.io/badge/Server-Invite-brightgreen" href = "">
   </a>
</p>

# Table 
- [Collection](#Collection)

# Start
```js
const { Client } = require("")
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