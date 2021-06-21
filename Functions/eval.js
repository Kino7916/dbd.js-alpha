const Lexer = require("../Interpreter/Lexer");
const AoiError = require("../Interpreter/AoiError")
module.exports = () => {
  return async function (d) {
    const unpacked = d.unpack();
  if (!d.hasUsage(unpacked)) return d.error(`Invalid usage of \`${d.func}\``, d.func);
  const [code, returnCode] = unpacked.splits;

  const codeEval = d.data.main.utils.escaped(code);

  const evaled = ( await Lexer({code: codeEval}, d.data.main, d.data.message, d.data.db, {args: d.data.args, returnCode: ( returnCode === "yes" ) || false}).catch(err => d.error(`Received Unexpected Error \`${err.message}\` at \`${d.func}${unpacked.total}\``, `${d.func}${unpacked.total}`)) ) || "";

  if (evaled instanceof AoiError) return evaled;
  return d.data.main.utils.escape(evaled || "");
  }
}