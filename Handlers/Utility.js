const Types = require("./Types");
const ResolveMessage = require("./resolveMessage");
const Discordjs = require("discord.js");

class DiscordUtility {
  constructor(client) { if (client instanceof Discordjs.Client ) this.client = client; this.discord = Discordjs}

  getGuild(id) {
    return this.client.guilds.fetch(id, false)
  }

  getChannel(id) {
    return this.client.channels.fetch(id, false)
  }

  getUser(id) {
    return this.client.users.fetch(id, false);
  }

  getUptime() {
    return Date.now() - this.client.readyTimestamp;
  }

  getEmoji(id) {
    return this.client.emojis.fetch(id, false)
  }

  getChannelPermissions(channelID, targetID) {
    return this.getChannel(id).then(channel => {
      if (!channel) return [];
      return channel.permissionsFor(targetID)
    })
  }

  escape(text) {
    return text.replace(";", "%COLON%")
    .replace("$", "%DOLSGN%");

  }

  escaped(text) {
    return text.replace("%COLON%", ";")
    .replace("%DOLSGN%", "$")
  }
}

module.exports = DiscordUtility