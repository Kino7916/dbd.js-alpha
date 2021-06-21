const D = require("discord.js");
const T = require("./Types");
const Lexer = require('../Interpreter/Lexer');
function RETURN_EVENT(EV, d) {
  function HANDLE_MESSAGE_EVENT(msg) {
    if (msg.author.id === d.client.client.user.id) return;
    if (d.client.ignoreDMs && msg.channel.type === "dm") return;
    if (d.client.ignoreBots) {
      if (msg.author.bot) return;
    }
    const commands = Array.from(d.client._commands.values()).filter(c => c.COMMAND_TYPE === T.Message);

    const getPrefix = function (content) {
      if (!content) return "";
      let p = false;
      for (const prefix of d.client.prefix) {
        if (content.startsWith(prefix)) {
          p = prefix; break;
        } else continue;
      }

      return p;
    }

    const slicePrefix = function (content) {
      if (!content || !getPrefix(content)) return content || "";

      return content.slice(getPrefix(content).length)
    }

    const alwaysExecute = commands.filter(c => !c.name),
    cmds = commands.find(c => {
      if (!c.name) return false;
      const givenName = slicePrefix(d.client._getArgs("", msg)[0]).toLowerCase();
      const aliases = [c.name.toLowerCase()];
      if (c.aliases) {
        if (Array.isArray(c.aliases) && c.aliases.map(_ => _.toLowerCase()).includes(givenName)) return true

        else if (typeof c.aliases === "string" && c.aliases.length) aliases.push(c.aliases);
      }

      if (aliases.includes(givenName)) return true;
      return false;
    });
    
    if (cmds) alwaysExecute.unshift(cmds);
    for (const cmd of alwaysExecute) {
      if (cmd.name && getPrefix(msg.content)) Lexer(cmd, d.client, msg, d.client.db, {args: d.client._getArgs(getPrefix(msg.content) + cmd.name, msg)});

      else if (!cmd.name) Lexer(cmd, d.client, msg, d.client.db, {args: d.client._getArgs("", msg)})
    }
  }

  function HANDLE_MEMBER_GUILD_ADD(member) {
    const commands = Array.from(d.client._commands.values()).filter(c => c.COMMAND_TYPE === T.GuildMemberAdd);

    for (const cmd of commands) Lexer(cmd, d.client, { member, author:member.user, guild: member.guild, content:"" }, d.client.db, {})
  }

  function HANDLE_READY_EVENT() {
    const commands = Array.from(d.client._commands.values()).filter(c => c.COMMAND_TYPE === T.Ready);
    for (const cmd of commands) Lexer(cmd, d.client, {}, d.client.db, {})
  }

  function HANDLE_MESSAGE_REACTION_ADD(messageReaction, user) {
    const commands = Array.from(d.client._commands.values()).filter(c => c.COMMAND_TYPE === T.MessageReactionAdd);

    const message = messageReaction.message;
    message.authorMessage = message.author.id;
    message.author = user;

    for (const cmd of commands) Lexer(cmd, d.client, message, d.client.db, {
      args: d.client._getArgs("", message),
      emojiReaction: messageReaction.emoji.id
    });
  }

  function HANDLE_MESSAGE_DELETE(message) {

    const commands = Array.from(d.client._commands.values()).filter(c => c.COMMAND_TYPE === T.MessageDelete);

    for (const cmd of commands) Lexer(cmd, d.client, message, d.client.db, {args: d.client._getArgs("", message)});
  }
  
  if (EV === "message") {
    return HANDLE_MESSAGE_EVENT;
  }

  if (EV === "ready") return HANDLE_READY_EVENT;

  if (EV === "guildMemberAdd") return HANDLE_MEMBER_GUILD_ADD;
  if (EV === "messageDelete") return HANDLE_MESSAGE_DELETE;
}


module.exports = RETURN_EVENT;