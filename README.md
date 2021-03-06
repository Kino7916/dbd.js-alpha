  <br />
    <p>
    <a href="(https://dbd.js.org/doc"><img src="https://dbd.js.org/assets/images/dbdjs.png" alt="dbd.js" /></a>
  </p>

# dbd.js
[![NPM Downloads](https://img.shields.io/npm/dt/dbd.js.svg?maxAge=3600)](https://www.npmjs.com/package/dbd.js)
[![Discord Server](https://img.shields.io/discord/773352845738115102?color=7289da&logo=discord&logoColor=white)](https://dbd.js.org/invite)
## Table Of Contents
- [About](#about)
  - [Setup](#setup)

## About
dbd.js is a NPM package that is covering Discord API by using discord.js as a wrapper.
<br>

Creating your Discord Bot with built-in functions with ease.
 </br>

## Before using
Please note NodeJS v14 is needed and Development is subject to change.

## Examples

### Setup
```js
const dbd = require("dbd.js")

const bot = new dbd.Bot({prefix: "!"})

bot.enableEvent("message");
bot.enableEvent("ready");

const id = bot.createCommmand({code:"$log[$username[$clientID] is Ready.]"});
bot.assignType(bot.Types.Ready, id);

bot.assignType(bot.Types.Message, bot.createCommmand({
  name:"ping", //Command Name
  code:"Pong! $pingms" //Returns <Websocket Ping> ms
}))

bot.login("Discord Bot Token")
```



## Links
- [Website](https://dbd.js.org)
- [Documentation](https://dbd.js.org/doc)
- [Discord Server](https://dbd.js.org/invite)