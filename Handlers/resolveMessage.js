const D = require("discord.js")

async function resolveMessage(message, client, channelID, content, embed, realCode) {
  if (message instanceof D.Message) {
    const msg = await message.edit(content, embed);
    return msg;
  }

  const channel = await client.channels.fetch(channelID, false);

  if (!channel) return new Error("Unavailable channel " + String(channelID) + " or not found as it's not available for Client.");
  const p = channel.permissionsFor(client.user.id).toArray();
  if (!p.includes("SEND_MESSAGES") && !p.includes("VIEW_CHANNEL")) return new Error("Missing Permissions to Send Messages for Channel " + String(channelID));

  if (!embed.description) embed = null;
  const msg = await channel.send(content, {embed});

  return msg;
}

module.exports = resolveMessage;