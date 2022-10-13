Cypress.Commands.add('login', ({ username, password }) => {
  cy.get('[data-test=login-form]').as('loginForm');
  cy.get('@loginForm').find('[data-test=username]').type(username);
  cy.get('@loginForm').find('[data-test=password]').type(password);
  cy.get('@loginForm').find('[type=submit]').click();
});
