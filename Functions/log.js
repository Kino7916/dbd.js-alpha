module.exports = d => {
  return function (d) {
    console.log(d.unpack().inside)
  }
}