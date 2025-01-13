// cypress/support/e2e.js

// This is where you can place global configurations or commands
// Example: adding a custom command
Cypress.Commands.add('login', (username, password) => {
    cy.request('POST', '/api/login', { username, password })
      .its('body')
      .then((body) => {
        window.localStorage.setItem('access_token', body.token);
      });
  });
  