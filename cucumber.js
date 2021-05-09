let common = [
  'features/**/*.feature',                // Specify our feature files
  '--require-module ts-node/register',    // Load TypeScript module
  '--require src/**/*.ts',                // Load step definitions
  '--format @cucumber/pretty-formatter',  // Load custom formatter
  '--format message:build/cucumber-messages.ndjson',
  '--format html:build/cucumber.html',
  '--publish-quiet'
].join(' ');

module.exports = {
  default: common
};

