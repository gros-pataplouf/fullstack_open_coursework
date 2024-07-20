// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("login", (user) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username: user.username,
    password: user.password,
  }).then(({ body }) => {
    localStorage.setItem(
      "blogUser",
      JSON.stringify({ ...body, name: user.name, isLoggedIn: true }),
    );
    cy.visit("");
  });
});

Cypress.Commands.add("createBlog", (blog) => {
  cy.request({
    url: `${Cypress.env("BACKEND")}/api/blogs`,
    method: "POST",
    body: blog,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("blogUser")).token}`,
    },
  });
});

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
