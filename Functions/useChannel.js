module.exports = () => {
  return async function (d) {
    const unpacked = d.unpack();

    if (!d.hasUsage(unpacked)) return d.error(`Invalid usage of \`${d.func}\`!`, d.func);

    const channel = await d.data.main.utils.getChannel(unpacked.inside);

    if (!channel) return d.error("Invalid Channel ID of `" + unpacked.inside + "`", `${d.func}${unpacked.total}`);
    d.data.channel = channel;
    return ""
  }
}