const FormatDate = require("../Handlers/FormatDate");

module.exports = d => {
  const unpacked = d.unpack();

  if (!d.hasUsage(unpacked)) return d.error(`Invalid usage of \`${d.func}\`!`, d.func);
  if (unpacked.splits.length === 2) return d.error(`Expected usage length of 2, instead found \`${unpacked.splits.length}\` of \`${d.func}${unpacked.total}\`!`, `${d.func}${unpacked.total}`);

  const date = new Date(unpacked.inside);
  let res = unpacked.inside;

  if (!date.valueOf()) return d.error(`Invalid or unparseable Date of \`${unpacked.inside}\`!`, `${d.func}${unpacked.total}`)

  switch (res) {
    case "year": res = date.getFullYear();
    break;
    case "month": res = date.getMonth() + 1;
    break;
    case "day": res = date.getDate() + 1;
    break;
    case "hour": res = date.getHours();
    break;
    case "minute": res = date.getMinutes();
    break;
    case "second": res = date.getSeconds();
    break;
    case "date": res = date.getDate();
    break;
    case "ms": res = date.getMilliseconds();
    break;
    case "time": res = date.getTime();
    break;
    case "offset": res = date.getTimezoneOffset();
    break;
    default: res = ""
  }

  return res;
}