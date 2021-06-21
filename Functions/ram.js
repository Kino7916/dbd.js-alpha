module.exports = async d => {
  const ram = (process.memoryUsage().rss / 1024 / 1024).toFixed(2)

return ram
}