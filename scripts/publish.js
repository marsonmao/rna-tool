import ghpages from "gh-pages";

ghpages.publish(
  "dist",
  {
    message: "Auto-generated commit",
  },
  function (err) {
    if (err) console.error("publishing to gh-pages error", err);
  }
);
