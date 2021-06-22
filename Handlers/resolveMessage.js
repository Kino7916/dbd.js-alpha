const D = require("discord.js")

async function resolveMessage(message, client, channelID, content, embed, realCode) {
  if (message instanceof D.Message) {
    const msg = await message.edit(content, embed);
    return msg;
  }

  const channel = await client.channels.fetch(channelID, false);

  if (!channel) return new Error("Unavailable channel " + String(channelID) + " or not found as it's not available for Client.");
  
  if (!embed.description) embed = {};
  try {
  const msg = await channel.send(content, {embeds: [embed]});

  return msg;
  } catch (err) {
    return err
  }
}

module.exports = resolveMessage;
