const dataAttr = (id) => `[data-test=${id}]`;
const testUser = { username: 'User', password: 'letmein' };

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset').then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
    cy.request('POST', 'http://localhost:3003/api/users', testUser).then(
      (response) => {
        expect(response.status).to.eq(201);
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

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get(dataAttr('login-form')).as('loginForm');
      cy.get(dataAttr('username')).type(testUser.username);
      cy.get(dataAttr('password')).type(testUser.password);
      cy.get('@loginForm').get('[type=submit]').click();
      cy.contains('blogs');
      cy.get(dataAttr('login-form')).should('not.exist');
    });

    it('fails with wrong credentials', function () {
      cy.get(dataAttr('login-form')).as('loginForm');
      cy.get(dataAttr('username')).type(testUser.username);
      cy.get(dataAttr('password')).type('wrongpassword');
      cy.get('@loginForm').get('[type=submit]').click();
      cy.contains('blogs').should('not.exist');
      cy.contains('invalid username or password').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      );
    });
  });
});
