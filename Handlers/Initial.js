const {Client} = require("discord.js")
const EventHandler = require("./EventHandler")
const Types = require("./Types")
const resolveMessage = require("./resolveMessage")
const Utility = require("./Utility")

class DiscordClient {
  constructor(options) {
    if (typeof options.prefix !== "string") {
      if (!Array.isArray) throw new TypeError("Prefix must be included!");
    }
    if (options.intents === true) this.intents = require("discord.js").Intents.ALL;
    this.intents = this.intents || require("discord.js").Intents.NON_PRIVILEGED;
    this.client = new Client({intents: this.intents, CacheOverwrites:true});
    this._commands = new Map();
    this.Types = Types;
    this.prefix = !Array.isArray(options.prefix) ? [options.prefix] : options.prefix;
    this.utils = new Utility(this.client);
    this.revertReading = options.revertReading === true;
    this.ignoreBots = "ignoreBots" in options ? options.ignoreBots : true;
    this.ignoreErrors = options.ignoreErrors;
    this.ignoreDMs = "ignoreErrors" in options ? options.ignoreErrors : true;

  }

  createCommmand(Command) {
    if (!Command.code) throw new Error("Missing `code` as property in Object!");
    Command.COMMAND_ID = this._createSnowflake(Math.random());
    this._commands.set(Command.COMMAND_ID, Command);
    return Command.COMMAND_ID;
  }

  assignType(Event, CommandID) {
    if (!Object.values(this.Types).includes(Event)) throw new TypeError("Event type is not valid!");
    if (!this._commands.has(CommandID)) throw new Error("Command with ID is not available!");

    const Command = this._commands.get(CommandID);
    Command.COMMAND_TYPE = Event;
    this._commands.set(Command.COMMAND_ID, Command);
  }

  enableEvent(DiscordJSEvent) {
    this.client.on(DiscordJSEvent, EventHandler(DiscordJSEvent, {client: this}))
  }

  _getArgs(sliceStr, message) {
    if (!message || !message.content) return []
    if (sliceStr) return message.content.replace(sliceStr, "").trim().split(/ +/g);
    const args = message.content.trim().split(/ +/g);
    return args;
  }

  login(clientToken) {
    this.client.login(clientToken).catch(_ => {throw new Error("Invalid Token was provided!")})
  }

  /*status(status) {
    this.client.on(status).catch(_ => {throw new Error ("Invalid Status was provided")})
  }
 */
  resolveMessage(message, client, channelID, content, embed) {
    return resolveMessage(message, client, channelID, content, embed)
  }

  _createSnowflake(n = Math.random()) {
  return Math.floor(n * 1234567890)
  }
}

module.exports.Bot = DiscordClient