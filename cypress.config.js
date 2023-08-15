const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  hideXHR: true,
  numTestsKeptInMemory: 10,
  watchForFileChanges: false,
  retries: {
    runMode: 1,
    openMode: 1,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.edgardcooper.com/en/',
  },
});
