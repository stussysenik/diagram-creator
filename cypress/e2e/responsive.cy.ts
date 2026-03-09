describe('Responsive Layout', () => {
  it('shows toggle on mobile viewport', () => {
    cy.viewport(375, 812);
    cy.visit('/');
    cy.get('.sidebar-toggle').should('be.visible');
  });

  it('opens sidebar on toggle click', () => {
    cy.viewport(375, 812);
    cy.visit('/');
    cy.get('.sidebar').should('not.be.visible');
    cy.get('.sidebar-toggle').click();
    cy.get('.sidebar').should('be.visible');
  });

  it('hides toggle on desktop viewport', () => {
    cy.viewport(1280, 900);
    cy.visit('/');
    cy.get('.sidebar-toggle').should('not.be.visible');
  });
});
