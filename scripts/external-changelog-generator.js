// scripts/external-changelog-generator.js
const fs = require('fs');
const path = require('path');

module.exports = {
  prepare: async (pluginConfig, context) => {
    const { nextRelease, commits } = context;
    const changelogFile = pluginConfig.changelogFile || 'CHANGELOG.md';

    const changelogText = `# Public Changelog\n\n## ${nextRelease.version}\n\n${commits
      .map((c) => `- ${c.subject}`)
      .join('\n')}\n`;

    fs.writeFileSync(path.resolve(process.cwd(), changelogFile), changelogText);

    context.logger.log(`✅ Generated public changelog at ${changelogFile}`);
  },
};
