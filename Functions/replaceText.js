module.exports = d => {
  const unpacked = d.unpack();
  let useReplace = false;
  const [str, target, newStr, howMany = -1] = unpacked.splits;
  if (!d.hasUsage(unpacked)) return d.error(`Invalid usage of \`${d.func}\`!`, d.func);

  if (unpacked.splits.length < 3) return d.error(`Expected required usage length of 3, instead found \`${unpacked.splits.length}\` at \`${d.func}${unpacked.total}\`!`, `${d.func}${unpacked.total}`);

  if (howMany < 0) useReplace = true;

  if (useReplace) {
    return str.replace(target, newStr)
  } else {
    const splits = str.split(target);
    const spliced = splits.splice(0, howMany);
    return spliced.join(newStr) + splits.join(target);
  }
}