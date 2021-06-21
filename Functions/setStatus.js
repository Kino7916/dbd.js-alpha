module.exports = async d => {
    const unpacked = d.unpack();

    if (!d.hasUsage(unpacked)) return d.error(`Invalid usage of \`${d.func}\`!`, d.func);
    const [name, type, presence, url] = unpacked.splits;

    const bot = d.data.client.user.setPresence({
        status: presence,
        activities: [
            {
            name: name,
            url,
            type: type.toUpperCase()
        }
        ]
    })

    if (!bot) return d.error(`Incorrect usage of \`${d.func}${unpacked.total}\`)`)

}
    return "";