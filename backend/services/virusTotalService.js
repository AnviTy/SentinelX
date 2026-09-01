const axios = require("axios");

const VT_API_KEY = process.env.VT_API_KEY;

async function checkFileHash(hash) {
    try {
        const response = await axios.get(
            `https://www.virustotal.com/api/v3/files/${hash}`,
            {
                headers: {
                    "x-apikey": VT_API_KEY,
                },
            }
        );

        const stats = response.data.data.attributes.last_analysis_stats;

        return {
            found: true,
            malicious: stats.malicious,
            suspicious: stats.suspicious,
            harmless: stats.harmless,
            undetected: stats.undetected
        };

    } catch (error) {

        if (error.response?.status === 404) {
            return {
                found: false
            };
        }

        throw error;
    }
}

module.exports = {
    checkFileHash
};