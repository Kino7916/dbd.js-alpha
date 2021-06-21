 this.client.setPresence({
        status: status.presence ?? status.status,
        idle: status.idle,
        activities: [{
            name: resolved?.code,
            type: status.type?.toUpperCase?.(),
            url: status.url
        }]
    })

module.exports = Status