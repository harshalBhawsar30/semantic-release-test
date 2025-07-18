const fs = require("fs");
const path = require("path");

module.exports = {
  generateNotes: async (pluginConfig, context) => {
    const { nextRelease, commits } = context;

    // Extract public entries (e.g., those with !public marker)
    const publicNotes = commits
      .filter(commit => commit.message.includes("!public"))
      .map(commit => ({
        type: commit.type,
        scope: commit.scope,
        message: commit.subject
      }));

    const data = {
      version: nextRelease.version,
      date: new Date().toISOString(),
      notes: publicNotes
    };

    const changelogPath = path.resolve(__dirname, "../public-changelog.json");
    let allLogs = [];

    if (fs.existsSync(changelogPath)) {
      try {
        allLogs = JSON.parse(fs.readFileSync(changelogPath, "utf-8"));
      } catch (e) {
        console.error("Failed to parse existing changelog. Starting fresh.");
      }
    }

    allLogs.unshift(data);

    fs.writeFileSync(changelogPath, JSON.stringify(allLogs, null, 2));

    return ""; // No extra notes appended to internal CHANGELOG.md
  }
};
