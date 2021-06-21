module.exports = () => {
    return function (d) {
      const unpacked = d.unpack();
  
      if (!d.hasUsage(unpacked)) return d.error(`Invalid usage of \`${d.func}\`!`, d.func);
      const [Text, URL] = unpacked.splits;
      if (Text.length > 2048) return d.error(`Maximum character has exceeds the limit of 256 in \`${d.func}${unpacked.total}\`!`, `${d.func}${unpacked.total}`);
  
      if (d.data.embedLength + Text.length > 6000) return d.error(`EmbedStructure has exceeds it's limit of 6000 characters when compiling \`${d.func}${unpacked.total}\`!`, `${d.func}${unpacked.total}`);
      d.data.embedLength += Text.length;
      d.data.embed.setAuthor(Text, URL);
      return "";
    }
  }