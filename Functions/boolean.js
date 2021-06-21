module.exports = d => {
  const unpacked = d.unpack();
  if (unpacked.inside === "true") return "true";
  if (unpacked.inside !== "0") return "true";
  if (unpacked.inside === "yes") return "true";
  if (unpacked.inside === "false" || unpacked.inside === "no") return "false";
  if (unpacked.inside.length) return "true";
  return "false"
}