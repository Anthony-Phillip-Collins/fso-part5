const user1 = { username: 'User1', password: 'letmein' };
const user2 = { username: 'User2', password: 'letmein' };
const testBlog = {
  title: 'Another Blog',
  author: 'John Doe',
  url: 'https://anotherblog.com',
};

require('../support/commands');

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `/api/test/reset`).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.createUser(user1);

    cy.createUser(user2);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in');
    cy.get('[data-test=login-form]').as('loginForm');
    cy.get('@loginForm').get('[data-test=username]');
    cy.get('@loginForm').get('[data-test=password]');
    cy.get('@loginForm').get('[type=submit]');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login(user1);
      cy.contains('blogs');
      cy.get('[data-test=login-form]').should('not.exist');
    });

    it('fails with wrong credentials', function () {
      cy.login({ ...user1, password: 'wrong' });
      cy.contains('blogs').should('not.exist');
      cy.contains('invalid username or password').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      );
    });
  });

  describe('Blog', function () {
    it('can be created when user is logged in', function () {
      cy.login(user1);

      cy.get('[data-test=blog]').should('not.exist');

      cy.get('[data-test=toggleable-button]').click();
      cy.get('[data-test=blog-form]').as('blogForm');
      cy.get('@blogForm').find('[name=title]').type('A new Blog');
      cy.get('@blogForm').find('[name=author]').type('John Doe');
      cy.get('@blogForm').find('[name=url]').type('https://anewblog.com');
      cy.get('@blogForm').find('[type=submit]').click();

      cy.get('[data-test=blog]').should('have.length', 1);
    });

    it('can be liked by owner', function () {
      cy.login(user1);

      cy.get('[data-test=blog]').should('not.exist');

      cy.createBlog(testBlog);

      cy.get('[data-test=blog]').as('blog');
      cy.get('@blog').find('[data-test=expand]').click();

      cy.get('@blog')
        .find('[data-test=likes]')
        .as('likes')
        .invoke('text')
        .then((text1) => {
          cy.get('@blog').find('[data-test=like]').click();

          cy.get('@likes')
            .invoke('text')
            .should((text2) => {
              expect(text1).not.to.eq(text2);
            });
        });
    });

    it('can be liked by others', function () {
      cy.login(user1);
      cy.createBlog(testBlog);

      cy.logout();

      cy.login(user2);

      cy.get('[data-test=blog]').as('blog');
      cy.get('@blog').find('[data-test=expand]').click();

      cy.get('@blog')
        .find('[data-test=likes]')
        .as('likes')
        .invoke('text')
        .then((text1) => {
          cy.get('@blog').find('[data-test=like]').click();

          cy.get('@likes')
            .invoke('text')
            .should((text2) => {
              expect(text1).not.to.eq(text2);
            });
        });
    });

    it('can be deleted by owner', function () {
      cy.login(user1);

      cy.createBlog(testBlog);

      cy.get('[data-test=blog]').as('blog');
      cy.get('@blog').find('[data-test=expand]').click();
      cy.get('@blog').find('[data-test=delete]').click();

      cy.get('@blog').should('not.exist');
    });

    it('can not be deleted by others', function () {
      cy.login(user1);
      cy.createBlog(testBlog);
      cy.logout();
      cy.login(user2);

      cy.get('[data-test=blog]').as('blog');
      cy.get('@blog').find('[data-test=expand]').click();
      cy.get('@blog').find('[data-test=delete]').should('not.exist');
    });

    it('is sorted by likes', function () {
      cy.login(user1);

      cy.createBlog({ ...testBlog, title: 'Blog A' });
      cy.createBlog({ ...testBlog, title: 'Blog B' });
      cy.createBlog({ ...testBlog, title: 'Blog C' });

      cy.get('[data-test=blog]').as('blog').should('have.length', 3);

      cy.get('@blog').find('[data-test=expand]').click({ multiple: true });

      cy.get('@blog').should('have.length', 3);

      cy.get('@blog').eq(0).as('blogA');
      cy.get('@blog').eq(1).as('blogB');
      cy.get('@blog').eq(2).as('blogC');

      cy.likeBlog('@blogC');

      cy.get('[data-test=blog]').eq(0).should('contain', 'Blog C');
      cy.get('[data-test=blog]').eq(1).should('contain', 'Blog A');
      cy.get('[data-test=blog]').eq(2).should('contain', 'Blog B');

      cy.likeBlog('@blogB');

      cy.get('[data-test=blog]').eq(0).should('contain', 'Blog C');
      cy.get('[data-test=blog]').eq(1).should('contain', 'Blog B');
      cy.get('[data-test=blog]').eq(2).should('contain', 'Blog A');

      cy.likeBlog('@blogB');

      cy.get('[data-test=blog]').eq(0).should('contain', 'Blog B');
      cy.get('[data-test=blog]').eq(1).should('contain', 'Blog C');
      cy.get('[data-test=blog]').eq(2).should('contain', 'Blog A');
    });
  });
});
