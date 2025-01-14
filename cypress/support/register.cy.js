describe('Register Page', () => {
  it('should allow the user to register', () => {
    cy.visit('http://host.docker.internal:3000');
    
    // Target the email input inside the register form
    cy.get('.register-form input[placeholder="Email"]').should('be.visible').type('newuser@example.com');
    cy.get('.register-form input[placeholder="Password"]').should('be.visible').type('password123');
    // cy.pause();

    
    cy.get('.register-form button[type="submit"]').click();
    
    // Assuming successful registration shows a success message
    cy.contains('The email address is already in use. Please try another one.').should('be.visible');
  });
});
