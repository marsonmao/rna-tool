var ghpages = require("gh-pages");

ghpages.publish(
  "build",
  {
    message: "Auto-generated commit",
  },
  function (err) {
    console.error("publishing to gh-pages error", err);
  }
);
