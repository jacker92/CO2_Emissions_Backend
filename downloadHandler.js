const http = require('http');
const fs = require('fs');
const extract = require('extract-zip');
const resolve = require('path').resolve
const debug = require('debug')('repository')
const util = require('util')

const download = async (url, dest) => {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, (response) => {
        response.pipe(file);
        file.on('finish', async () => {
            debug("Closing file!");
            file.close();  // close() is async, call cb after close completes.
        });
    }).on('error', (err) => { // Handle errors
        debug("There is an error!");
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
    });
    
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 5000);
    });
};

const removeUnnecessaryLines = (path) => {
    debug("Reading file: " + path);
    let data = fs.readFileSync(path, "utf8");
    debug("File readed!");
    debug("Data length: " + data.length);

    let lines = data.split('\n');
    lines.splice(0, 4);
    let splited = lines.join('\n');

    debug("Writing parsed data to disc.")
    fs.writeFileSync(path, splited);
    debug("File writed to disc.");
}

const ExtractFiles = async () => {
     extract("data.zip", { dir: resolve("./data") }, async (err) => {
        if (err) {
            debug(err);
            process.exit(1);
        }
        debug("Files extracted.");
        debug("Deleting zip file.");
        fs.unlinkSync("data.zip");
        debug("Zip file deleted.");

        debug("Reading files.");
        let files = fs.readdirSync("./data");
        debug("Finished reading files.");

        files.forEach(file => {
            if (file.startsWith("Metadata")) {
                debug("Deleting file " + file + ".");
                fs.unlinkSync(resolve("./data/" + file));
            } else {
                debug("Renaming file " + file + ".");
                fs.renameSync(resolve("./data/" + file), resolve("./data/data.csv"));
            }
        });
        removeUnnecessaryLines(resolve("./data/data.csv"));
    });
}

const StartDownload = async () => {
    console.log("In start download!");
    await download("http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=csv", "data.zip");

    debug("Return from download function!");
    await ExtractFiles();
    debug("Return from Extract function!");
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Files downloaded!");
            resolve('resolved');
        }, 5000);
    })
}

StartDownload();
setInterval(StartDownload, 60000*60*24);

module.exports = {
    StartDownload
}
