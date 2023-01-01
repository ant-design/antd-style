module.exports = {
  extends: ['semantic-release-config-gitmoji'],
  branches: ['master', { name: 'rc', prerelease: 'rc' }, 'alpha', 'beta'],
};
