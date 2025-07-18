const fs = require('fs');
const path = require('path');

module.exports = {
  prepare: async (pluginConfig, context) => {
    const { nextRelease, commits } = context;
    const version = nextRelease.version;

    // Create a file like external-1.2.3.md
    const changelogFile = `external-${version}.md`;

    const changelogText = `# Public Changelog\n\n## ${version}\n\n${commits
      .map((c) => `- ${c.subject}`)
      .join('\n')}\n`;

    fs.writeFileSync(path.resolve(process.cwd(), changelogFile), changelogText);

    context.logger.log(`✅ Generated external changelog: ${changelogFile}`);
  },
};
