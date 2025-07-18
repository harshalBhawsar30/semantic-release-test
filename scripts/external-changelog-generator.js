const fs = require('fs');
const path = require('path');

module.exports = {
  prepare: async (pluginConfig, context) => {
    const { nextRelease, commits, logger } = context;
    const version = nextRelease.version;
    const filename = `external-${version}.md`;
    const filePath = path.resolve(process.cwd(), filename);

    const content = `# Public Changelog\n\n## ${version}\n\n${commits
      .map((c) => `- ${c.subject}`)
      .join('\n')}\n`;

    fs.writeFileSync(filePath, content);
    logger.log(`✅ External changelog created: ${filename}`);
  },
};
