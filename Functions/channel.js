module.exports = async d => {
  const unpacked = d.unpack();

  if (!d.hasUsage(unpacked)) return d.error(`Invalid usage of \`${d.func}\``, d.func);
  if (unpacked.splits.length < 2) return d.error(`Expected usage length of 2, instead found \`${unpacked.splits.length}\` at \`${d.func}${unpacked.total}\`!`, `${d.func}${unpacked.total}`);
  const id = unpacked.splits.shift()
  const channel = await d.data.main.utils.getChannel(id);
  if (!channel) return d.error(`Invalid Channel ID of \`${id}\` at \`${d.func}${unpacked.total}\`!`, `${d.func}${unpacked.total}`);

  let res = unpacked.splits[0];

  switch (res) {
    case "use": {
      d.data.channel = channel;
      res = ""
    }
    break;
    case "id":  res = channel.id 
    break;
    case "name":  res = channel.name 
    break;
    case "guild":  res = channel.guild ? channel.guild.id : "" 
    break;
    case "created":  res = channel.createdTimestamp 
    break;
    case "type": res = channel.type
    break;
    case "category": res = channel.parentID
    break;
    case "position": res = channel.position
    break;
    case "rawPosition": res = channel.rawPosition
    break;
    default:  res = d.error(`Invalid option of \`${unpacked.splits[0]}\` at \`${d.func}${unpacked.total}\`!`, `${d.func}${unpacked.total}`) 
    break;
  }

  return res;
}