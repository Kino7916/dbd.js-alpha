module.exports = async d => {
try {
    process.on("exit", () => {
      require("child_process").spawn(process.argv.shift(), process.argv, {
        cwd: process.cwd(),
        detached: true,
        stdio: "inherit",
      });
    });
    process.exit();
} catch (error){

return d.error(`Unable to reboot...`)
  }
}