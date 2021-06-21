module.exports = d => {
    return Date.now() - d.data.message.createdTimestamp
}