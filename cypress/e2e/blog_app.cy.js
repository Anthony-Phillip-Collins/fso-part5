const dataAttr = (id) => `[data-test=${id}]`;

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset').then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in');
    cy.get(dataAttr('login-form')).as('loginForm');
    cy.get('@loginForm').get(dataAttr('username'));
    cy.get('@loginForm').get(dataAttr('password'));
    cy.get('@loginForm').get('[type=submit]');
  });
});
