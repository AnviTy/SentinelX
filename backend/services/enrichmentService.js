const { checkFileHash } = require("./virusTotalService");

async function enrichEvent(event) {

    let vtResult = {
        found: false,
        malicious: null,
        suspicious: null,
        harmless: null,
        undetected: null
    };

    if (!event.Hashes) {
        return vtResult;
    }

    const sha256 = event.Hashes
        .split(",")
        .find(h => h.startsWith("SHA256="))
        ?.replace("SHA256=", "")
        .trim();
    console.log("SHA256:", sha256);
    if (!sha256) {
        return vtResult;
    }

    try {
        vtResult = await checkFileHash(sha256);
    } catch (err) {
        console.error("VirusTotal:", err.message);
    }
    console.log("VirusTotal Result:", vtResult);
    return vtResult;
}

module.exports = {
    enrichEvent
};