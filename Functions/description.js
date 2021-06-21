module.exports = () => {
  return function (d) {
    const unpacked = d.unpack();

    if (!d.hasUsage(unpacked)) return d.error(`Invalid usage of \`${d.func}\`!`, d.func);
    
    if (!unpacked.inside.length) return d.error(`1st Field is Required for usage of \`${d.func}${unpacked.total}\`!`, `${d.func}${unpacked.total}`);

    if (unpacked.inside.length > 2048) return d.error(`Maximum character has exceeds the limit of 2048 at \`${d.func}${unpacked.total}\`!`, `${d.func}${unpacked.total}`);

    if (d.data.embedLength + unpacked.inside.length > 6000) return d.error(`EmbedStructure has exceeds it's limit of 6000 characters when compiling\`${d.func}${unpacked.total}\`!`, `${d.func}${unpacked.total}`);

    d.data.embedLength += unpacked.inside.length
    d.data.embed.setDescription(unpacked.inside);
    return "";
  }
}