require("dotenv").config();

const { checkFileHash } = require("./services/virusTotalService");

async function run() {

    const hash =
        "275a021bbfb6488d18d57a3afbbbe95a48f3d43c6ea9b8e6d5c5f9f7b4d546f5";

    const result = await checkFileHash(hash);
     if (!result) {
        console.log("VirusTotal lookup failed.");
        return;
    }

    console.log("File Name:", result.data.attributes.meaningful_name);

    console.log("Detection Stats:");
    console.log(result.data.attributes.last_analysis_stats);
}

run();