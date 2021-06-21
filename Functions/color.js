const djs = require("discord.js");

module.exports = () => {
  return function (d) {
    const unpacked = d.unpack();

    if (!d.hasUsage(unpacked)) return d.error(`Invalid usage of \`${d.func}\`!`, d.func);
    
    if (!unpacked.inside.length) return d.error(`1st Field is Required for usage of \`${d.func}${unpacked.total}\`!`, `${d.func}${unpacked.total}`);

    const color = djs.Util.resolveColor(unpacked.inside);
    if (!color) return d.error(`Invalid color code of \`${unpacked.inside}\` at \`${d.func}${unpacked.total}\`!`, `${d.func}${unpacked.total}`);
    d.data.embed.setColor(color);
    return "";
  }
}