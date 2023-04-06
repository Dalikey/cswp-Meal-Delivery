describe('meals', () => {
  beforeEach(() => {
    cy.visit('');

    cy.contains('Inloggen').click();

    cy.get('#username').type('owner');

    cy.get('#password').type('secret1');

    cy.contains('button', 'Inloggen').click();
  });

  it('should create meal', () => {
    cy.get('.meal-card').click();

    cy.get('.btn').contains('Nieuwe').click({ force: true });

    cy.get('#name').type('Cypress maaltijd', { force: true });

    cy.get('#price').type('1.99', { force: true });

    cy.get('#deliverytime').click({ force: true });

    cy.get('#deliverytime').type('22:22');

    cy.get('#deliverydate').click({ force: true });

    cy.get('#deliverydate').type('2023-04-07');

    cy.get('#studentHouse').select('Lovensdijkstraat 61', { force: true });

    cy.get('#save-meal-btn').click({ force: true });
  });
});
