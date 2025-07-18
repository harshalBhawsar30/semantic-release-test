/** @type {import('semantic-release').GlobalConfig} */
module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md', // Keep appending internal changelog
      },
    ],
    [
      './scripts/external-changelog-generator.js',
      {
        changelogFile: 'external-changelog.md', // Fresh per release
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'EXTERNALCHANGELOG.md' ,'package.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: ['external-changelog.md'], // This uploads it to GitHub release
      },
    ],
  ],
};
