// cypress.config.js
module.exports = {
    e2e: {
      baseUrl: 'http://host.docker.internal:3000',  // Use this for Mac/Windows
      // other configuration options
      specPattern: '**/*.cy.{js,jsx,ts,tsx}',  // Adjust this path as needed
      supportFile: 'cypress/support/e2e.js', // Ensure this matches your support file path

    },
  };
  