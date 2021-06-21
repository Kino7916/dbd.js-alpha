module.exports = d => {
  const unpacked = d.unpack();

  if (!d.hasUsage(unpacked)) return Date.now();
  const date = new Date(unpacked.inside);
  return date.valueOf();
}