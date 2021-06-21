module.exports = d => {
  const unpacked = d.unpack();

  if (!d.hasUsage(unpacked)) return d.error(`Invalid usage of \`${d.func}\`!`, d.func);
  const values = unpacked.splits;
  const firstVal = new Number(values.shift());
  return values.reduce((n, v) => n - new Number(v), firstVal);
}