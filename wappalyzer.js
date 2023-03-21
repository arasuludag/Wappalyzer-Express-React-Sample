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
  getTechnologies: async (req, res) => {
    let results;

    try {
      await wappalyzer.init();

      const site = await wappalyzer.open(url);
      results = await site.analyze();
    } catch (error) {
      console.error(); // Normally error handler should be implemented.
    }

    await wappalyzer.destroy();

    if (results) res.send(results.technologies);
    else res.sendStatus(503);
  },
};
