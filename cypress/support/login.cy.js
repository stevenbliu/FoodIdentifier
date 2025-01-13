// login.cy.js
describe('Login Page', () => {
    it('should allow the user to log in', () => {
      cy.visit('http://host.docker.internal:3000');
      cy.get('input[name="email"]').type('user@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });
  });
  