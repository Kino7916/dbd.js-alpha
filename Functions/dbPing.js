module.exports = async d => {
const start = Date.now()
await d.client.data.db.all("main")
 //DEFINE DB

/*WILL NOT WORK IF THE DATABASE IS NOT SET WITHIN THE CLIENT FIELD / SET*/

return `${Data.now() - start}`
}