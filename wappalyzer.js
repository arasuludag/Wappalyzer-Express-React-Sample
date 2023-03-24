const Wappalyzer = require("wappalyzer");

const options = {
  debug: false,
  recursive: true,
  probe: true,
  noScripts: false,
  noRedirect: false,
};

const wappalyzer = new Wappalyzer(options);

module.exports = {
  getAnalyzation: async (req, res) => {
    const urlChk =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const urlRegex = new RegExp(urlChk);

    if (!req.params.website.match(urlRegex)) res.sendStatus(403);

    let results;

    try {
      await wappalyzer.init();

      const site = await wappalyzer.open(req.params.website);
      results = await site.analyze();
    } catch (error) {
      console.error(error); // Normally error handler should be implemented.
    }

    await wappalyzer.destroy();

    if (results)
      res.send({
        numOfURLs: Object.keys(results.urls).length,
        technologies: results.technologies.map((tech) => tech.name),
      });
    else res.sendStatus(503);
  },
};
