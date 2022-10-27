const { spawn, exec } = require('node:child_process');
const process = require('node:process');

let midiPid
let yousicianPid

spawn("C:\\Program Files\\MidiKey2Key\\MidiKey2Key.exe")

setTimeout(
    () => {
        spawn("C:\\Users\\glen_\\AppData\\Roaming\\Yousician Launcher\\Yousician Launcher.exe")
        setTimeout(
            () => {
                exec('tasklist', function (err, stdout, stderr) {
                    tasks = stdout.matchAll(/^Yousician.exe.+$/gmi)
                    for (const result of tasks) {
                        let item = result[0].split(/\s+/)
                        console.log(item[1])
                        yousicianPid = item[1]
                    }
                });
            }
            , 6000);
    }
    , 1500);

exec('tasklist', function (err, stdout, stderr) {
    tasks = stdout.matchAll(/^MidiKey2Key.exe.+$/gmi)
    for (const result of tasks) {
        let item = result[0].split(/\s+/)
        midiPid = item[1]
    }
});
process.on('SIGINT', () => {
    console.log("killing ", midiPid)
    process.kill(midiPid)
    console.log("killing ", yousicianPid)
    process.kill(yousicianPid)
    console.log("bye")
    process.exit()
});