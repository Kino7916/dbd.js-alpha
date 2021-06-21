module.exports = () => {
 return function (d) { const unpacked = d.unpack();
  
  if (!d.hasUsage(unpacked)) return d.error(`Invalid usage of \`${d.func}\`!`, d.func);

  if (unpacked.splits.length === 2) return d.error(`Expected usage length of 2, instead found \`${unpacked.splits.length}\` at \`${d.func}${unpacked.total}\`!`, `${d.func}${unpacked.total}`);

  const [condition, error] = unpacked.splits;
  const b = d.checkCondition(condition);

  if (!b) return d.error(error, `${d.func}${unpacked.total}`);
 }
}