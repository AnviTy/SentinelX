const { exec } = require("child_process");
const xml2js = require("xml2js");

function getSysmonEvents() {
  console.log("🔥 getSysmonEvents() CALLED");
  return new Promise((resolve, reject) => {
    const command =
  'wevtutil qe Microsoft-Windows-Sysmon/Operational /q:"*[System[(EventID=1)]]" /c:100 /rd:true /f:xml';
    exec(command, { maxBuffer: 1024 * 1024 }, async (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      try {
        const wrappedXml = `<Events>${stdout}</Events>`;
        const parsed = await xml2js.parseStringPromise(wrappedXml);

        const events = parsed.Events?.Event || [];
        const formattedEvents = events.map((event) => {
          const system = event.System?.[0] || {};
          const eventData = event.EventData?.[0]?.Data || [];

          const data = {};

          eventData.forEach((item) => {
            if (item.$?.Name) {
              data[item.$.Name] = item._ || "";
            }
          });

          return {
            eventId: system.EventID?.[0],
             eventRecordId: system.EventRecordID?.[0],
            timestamp: system.TimeCreated?.[0]?.$?.SystemTime,
            computer: system.Computer?.[0],
            ...data
          };
        });
       console.log("USER VALUE:", formattedEvents[0].User);

console.log(
  "ALL USER-RELATED FIELDS:",
  Object.keys(formattedEvents[0]).filter(key =>
    key.toLowerCase().includes("user")
  )
);
        resolve(formattedEvents);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

module.exports = {
  getSysmonEvents
};