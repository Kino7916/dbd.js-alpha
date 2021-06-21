module.exports = d => {
  if (!d.data.message || !d.data.message.author) return "";
  return d.data.message.author.id;
}