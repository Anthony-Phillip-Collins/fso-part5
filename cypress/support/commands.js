Cypress.Commands.add('createUser', ({ username, password }) => {
  cy.request('POST', `/api/users`, { username, password }).then((response) => {
    expect(response.status).to.eq(201);
  });
});

Cypress.Commands.add('login', ({ username, password }) => {
  cy.get('[data-test=login-form]').as('loginForm');
  cy.get('@loginForm').find('[data-test=username]').type(username);
  cy.get('@loginForm').find('[data-test=password]').type(password);
  cy.get('@loginForm').find('[type=submit]').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-test=logout]').find('[type=submit]').click();
});

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.get('[data-test=toggleable-button]').click();
  cy.get('[data-test=blog-form]').as('blogForm');
  cy.get('@blogForm').find('[name=title]').type(title);
  cy.get('@blogForm').find('[name=author]').type(author);
  cy.get('@blogForm').find('[name=url]').type(url);
  cy.get('@blogForm').find('[type=submit]').click();
});

Cypress.Commands.add('likeBlog', ($blog) => {
  cy.get($blog).find('[data-test=like]').click();
  cy.get($blog)
    .find('[data-test=likes]')
    .as('likes')
    .invoke('text')
    .then((text1) => {
      cy.get('@likes')
        .invoke('text')
        .should((text2) => {
          expect(text1).not.to.eq(text2);
        });
    });
});
