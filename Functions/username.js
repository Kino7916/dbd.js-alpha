module.exports = async d => {
  const unpacked = d.unpack();

  if (!d.hasUsage(unpacked)) return d.data.message.author.username;

  const user = await d.data.main.utils.getUser(unpacked.inside).catch(err => null)
  if (!user) return d.error(`Invalid User ID \`${unpacked.inside}\` at \`${d.func}${unpacked.total}\``, `${d.func}${unpacked.total}`);

  return user.username;
}