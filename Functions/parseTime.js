const ms = require("ms");
module.exports = async d => {
    const unpacked = d.unpack();
  
    if (!d.hasUsage(unpacked)) return d.error(`Invalid usage of \`${d.func}\`!`, d.func);
    const parse = ms(unpacked.inside)
    if (!parse) return d.error(`Invalid usage of \`${unpacked.inside}\` at \`${d.func}${unpacked.total}\``, `${d.func}${unpacked.total}`);
  
    return parse;
  }