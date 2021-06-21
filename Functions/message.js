module.exports = d => {
  const unpacked = d.unpack();
  let res = "";
  if (!d.data.message) return d.data.main.utils.escape("");
  if (!d.hasUsage(unpacked) || (isNaN(unpacked.inside) && !unpacked.inside.includes("<") && !unpacked.inside.includes(">"))) return d.data.main.utils.escape((d.data.args ? d.data.args.join(" ") : d.data.message.content));

  if (unpacked.inside === ">") return d.data.main.utils.escape(d.data.args[d.data.args.length - 1]);
  if (unpacked.inside === "<") return d.data.main.utils.escape(d.data.args[0]);
  if ((unpacked.inside.endsWith("<") || unpacked.inside.startsWith(">")) && unpacked.inside.length > 1) {
    const N = Number(unpacked.inside.replace(/(<|>)/g, ""))
    if (isNaN(N)) return d.data.main.utils.escape("");
    if (unpacked.inside.endsWith("<")) return d.data.main.utils.escape(d.data.args.slice(0, N).join(" "));
    if (unpacked.inside.startsWith(">")) return d.data.main.utils.escape(d.data.args.slice(N).join(" "));
  }
  if (!isNaN(Number(unpacked.inside))) return d.data.main.utils.escape(d.data.args[Number(unpacked.inside) - 1] || "");

  return d.data.main.utils.escape(res);
}