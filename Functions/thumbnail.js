module.exports = () => {
    return function (d) {
      const unpacked = d.unpack();
  
      if (!d.hasUsage(unpacked)) return d.error(`Invalid usage of \`${d.func}\`!`, d.func);
      
      if (!unpacked.inside.length) return d.error(`1st Field is Required for usage of \`${d.func}${unpacked.total}\`!`, `${d.func}${unpacked.total}`);
  
      d.data.embedLength += unpacked.inside.length
      d.data.embed.setThumbnail(unpacked.inside);
      return "";
    }
  }