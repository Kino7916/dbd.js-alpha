const Parser = require( "./Parser" );
const AoiError = require("./AoiError");
const Discord = require("discord.js");
const checkCondition = require("../Handlers/CheckCondition");
function getMatchIndexes(str, toMatch) {
    var toMatchLength = toMatch.length,
        indexMatches = [], match,
        i = 0;

    while ((match = str.indexOf(toMatch, i)) > -1) {
        indexMatches.push(match);
        i = match + toMatchLength;
    }

    return indexMatches;
}

function unpack(code, functionName) {
  const R = code.split(functionName).length - 1;
  const F = code.split(functionName)[R];
  const startIndex = F.indexOf("[");

  const startIndexes = getMatchIndexes(F, "[");
  const lastIndexes = getMatchIndexes(F, "]");
  
  const index = startIndexes.findIndex(f => f === startIndex);
  const lastIndex = lastIndexes.length >= startIndexes.length ? lastIndexes[index] : -1;
  
  
  const sliced = F.slice(startIndex, lastIndex + 1);

  const hasInside = sliced.startsWith("[") && ( lastIndex >= 0 ) ? true : false
  const hasOpening = F.startsWith("[");
  
  if (hasInside) {
  return {
    total: sliced,
    inside: F.slice(startIndex + 1, lastIndex),
    splits: F.slice(startIndex + 1, lastIndex).split(";"),
    open: hasOpening,
    closed: hasInside
    }
  } else {
    return {
    total: hasOpening ? F : "",
    inside: hasOpening ? F.slice(startIndex + 1, F.length) : "",
    splits: hasOpening ? F.slice(startIndex + 1, F.length).split(";") : new Array(),
    open: hasOpening,
    closed: hasInside
    }
  }
}

function hasUsage(object) {
  if (!object.total.length) return false;

  return true
}

function replaceLast(str, target, val) {
  const Split = str.split(target);
  const Pop = Split.pop();
  return Split.join(target) + String(val) + Pop;
}

function createSnowflake(n = Math.random()) {
  return Math.floor(n * 1234567890)
}

function getArgs(sliceStr, message) {
    if (sliceStr) return message.content.replace(sliceStr, "").trim().split(/ +/g);
    const args = message.content.trim().split(/ +/g);
    return args;
  }

async function Lexer( Command, Client, Message = {}, Database, providedData ) {
  const data = {
    client: Client.client,
    message: Message,
    channel: Message.channel,
    db: Database,
    error: null,
    array: [],
    object: {},
    args: typeof Message.content === "string" ? getArgs("", Message) : [],
    embed: new Discord.MessageEmbed(),
    main: Client,
    ...providedData
  }

/*  const DBDdb = require("dbdjs.db");
  module.exports = async d => {
  const Database = new DBDdb.Database({
    
    path: "./Database/",
    tables: [
      {
        name: "main",
      },
    ],
    maxFileData: 10000,
    cacheMaxSize: 10000,
    saveTime: 3,
    getTime: 1,
    allTime: 2,
    deleteTime: 4,
  })
    Database.once("ready", () => {
      console.log(`Database ready!`);
    });
  
    Database.connect();
  }
 */
  let CommandCode = Command.code
const Functions = CommandCode.split("$")
  const ParserFunctions = Object.keys( Parser ).filter( f => CommandCode.toLowerCase().includes( f.toLowerCase() ) );
  const Cache = new Array();

  for (const F of Functions.reverse()) {
    const f = `$${F}`
    let CollectedFunctions = ParserFunctions.filter(s => s.toLowerCase() === f.slice(0, s.length).toLowerCase())
    
    if (Array.isArray(CollectedFunctions) && CollectedFunctions.length > 1) {
      const maxIndex = CollectedFunctions.sort((x, y) => y.length - x.length)[0].length;
      const option = f.slice(0, maxIndex);
      CollectedFunctions = CollectedFunctions.find((f) => f === option);

    } 
    else if (Array.isArray(CollectedFunctions) && CollectedFunctions.length === 1) CollectedFunctions = CollectedFunctions[0]

    else continue;
    
   const l = CollectedFunctions.length

   const unpacked = unpack(CommandCode, f.slice(0, l));

    let getFile = require("../Functions/" + CollectedFunctions.slice(1) + ".js")({
      unpack: function () {return unpacked;},
      hasUsage,
      data,
      checkCondition,
      func: f.slice(0, l),
      error: function (ErrorMessage, ErrorProblem) { return new AoiError(ErrorMessage, ErrorProblem)},
      command:Command
    });
    
    if (getFile && typeof getFile.then === "function") getFile = await getFile;

    if (getFile instanceof AoiError && !data.main.ignoreErrors) {
      data.error = getFile;
      break;
    }

    const isFN = (typeof getFile === "function");
    const id = createSnowflake();
    const getContentsOfFile = async function (id) {
      if (data.main.revertReading && isFN) {
        const res = await getFile({
          unpack: function () {return unpacked;},
          id,
          hasUsage,
          func: f.slice(0, l),
          fn: getFile,
          error: function (ErrorMessage, ErrorProblem) { return new AoiError(ErrorMessage, ErrorProblem)},
          command:Command,
          checkCondition,
          data
        });

        if (res instanceof AoiError && !data.main.ignoreErrors) {data.error = res;return "break"}
        return res
      }
      else if (!data.main.revertReading && isFN) return `CACHEFUNCTION=${id}`
      else {
        if (getFile instanceof AoiError && !data.main.ignoreErrors) {
          data.error = getFile
          return "break"
        }
        else return getFile
      }
    }
    let res = await getContentsOfFile(id);
    if (res === "break") break;
    if (!res && isNaN(res)) res = "" 
      if (hasUsage(unpacked)) {
        CommandCode = replaceLast(CommandCode, f.slice(0, l) + unpacked.total, String(res))
      } else {
        CommandCode = replaceLast(CommandCode, f.slice(0, l), String(res))
      }

      if (isFN && !data.main.revertReading) {
        Cache.push({
          unpack: function () {return unpacked;},
          id,
          hasUsage,
          func: f.slice(0, l),
          fn: getFile,
          error: function (ErrorMessage, ErrorProblem) { return new AoiError(ErrorMessage, ErrorProblem)},
          command:Command
        });
      }
    }


  if (!data.main.revertReading) {
  for (const packet of Cache.reverse()) {
    let res = packet.fn({...packet, data, checkCondition});
    if (res && typeof res.then === "function") res = await res;
    if (res instanceof AoiError && !data.main.ignoreErrors) {
      data.error = res;
      break;
    }

    if (!res && isNaN(Number(res))) res = "";

    CommandCode = replaceLast(CommandCode, `CACHEFUNCTION=${packet.id}`, String(res))
  }
  }

  CommandCode = data.main.utils.escaped(CommandCode);
  if (!data.blockRest) {
    
  if (data.error instanceof AoiError && !data.main.ignoreErrors) {
     if (data.channel) {
       const embed = data.error.getMessageEmbed();
     const msg = data.error.msg;
     data.main.resolveMessage(null, data.client, data.channel.id, msg, embed, Command.code).catch(_ => {})
     } else {
     const msg = data.error.msg;
     console.error(msg)
     }
  } else {
    if (data.channel) {
    data.main.resolveMessage(null, data.client, data.channel.id, CommandCode, data.embed, Command.code).catch(_ => {  })
    } else {
      console.log(CommandCode)
    }
  }
  }

  if (data.returnCode) return CommandCode;

}

module.exports = Lexer