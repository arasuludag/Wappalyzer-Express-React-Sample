const Wappalyzer = require("wappalyzer");

const url = "https://epctex.com/";

const options = {
  debug: false,
  delay: 500,
  headers: {},
  maxDepth: 3,
  maxUrls: 10,
  maxWait: 5000,
  recursive: true,
  probe: true,
  proxy: false,
  userAgent: "Wappalyzer",
  htmlMaxCols: 2000,
  htmlMaxRows: 2000,
  noScripts: false,
  noRedirect: false,
};

const wappalyzer = new Wappalyzer(options);

module.exports = {
  getAnalitics: async (req, res) => {
    try {
      await wappalyzer.init();

      const site = await wappalyzer.open(url);

      // Optionally capture and output errors
      site.on("error", console.error);

      const results = await site.analyze();

      console.log(JSON.stringify(results, null, 2));
      await wappalyzer.destroy();
      res.send(results);
    } catch (error) {
      console.error(error);
      await wappalyzer.destroy();
      res.sendStatus(503);
    }
  },
};
