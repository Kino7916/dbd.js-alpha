module.exports = d => {
  const unpacked = d.unpack();

  if (!d.hasUsage(unpacked)) return d.error(`Invalid usage of \`${d.func}\`!`, d.func);
  return Math.round(Number(unpacked.inside))
}