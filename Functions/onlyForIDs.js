module.exports = () => {
  return function (d) {
  const unpacked = d.unpack();

  if (!d.hasUsage(unpacked)) return d.error(`Invalid usage of \`${d.func}\`!`, d.func);

  if (unpacked.splits.length < 2) return d.error(`Expected required usage length of 2, instead found \`${unpacked.splits.length}\` at \`${d.func}${unpacked.total}\`!`, `${d.func}${unpacked.total}`);

  const ErrorMessage = unpacked.splits.pop();
  if (!unpacked.splits.includes(d.data.message.author.id)) return d.error(ErrorMessage, `${d.func}${unpacked.total}`);

  return "";
  }
}