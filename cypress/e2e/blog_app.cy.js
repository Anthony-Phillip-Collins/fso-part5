const dataAttr = (id) => `[data-test=${id}]`;
const testUser = { username: 'User', password: 'letmein' };
const apiBase = 'http://localhost:3003';

require('../support/commands');

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${apiBase}/api/test/reset`).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.request('POST', `${apiBase}/api/users`, testUser).then((response) => {
      expect(response.status).to.eq(201);
    });

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
      cy.login(testUser);
      cy.contains('blogs');
      cy.get(dataAttr('login-form')).should('not.exist');
    });

    it('fails with wrong credentials', function () {
      cy.login({ ...testUser, password: 'wrong' });
      cy.contains('blogs').should('not.exist');
      cy.contains('invalid username or password').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      );
    });

    it('A blog can be created', function () {
      cy.login(testUser);

      cy.get(dataAttr('blog')).should('not.exist');

      cy.get(dataAttr('toggleable-button')).click();
      cy.get(dataAttr('blog-form')).as('blogForm');
      cy.get('@blogForm').find('[name=title]').type('A new Blog');
      cy.get('@blogForm').find('[name=author]').type('John Doe');
      cy.get('@blogForm').find('[name=url]').type('https://anewblog.com');
      cy.get('@blogForm').find('[type=submit]').click();

      cy.get(dataAttr('blog')).should('have.length', 1);
    });
  });
});
