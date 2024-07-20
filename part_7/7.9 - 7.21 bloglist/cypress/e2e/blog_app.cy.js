const user = { username: "mp110", name: "nomiddlename", password: "neagley" };

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/api/testing/reset`);
    cy.request("POST", `${Cypress.env("BACKEND")}/api/users`, user);
    cy.visit("");
  });

  it("displays login form by default", function () {
    cy.get('form[data-testid="login-form"]');
    cy.get('input[data-testid="login-username"]');
    cy.get('input[data-testid="login-password"]');
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get('input[data-testid="login-username"]').type(user.username);
      cy.get('input[data-testid="login-password"]').type(user.password);
      cy.get('button[data-testid="login-button"]').click();
      cy.contains(`You are logged in as ${user.name}`);
    });

    it("fails with wrong credentials", function () {
      cy.get('input[data-testid="login-username"]').type(user.username);
      cy.get('input[data-testid="login-password"]').type("invalid");
      cy.get('button[data-testid="login-button"]').click();
      cy.get('[data-testid="warning"]')
        .should("be.visible")
        .and("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in and blogs already present", function () {
    beforeEach(function () {
      cy.fixture("testUsers").then((users) => {
        users.forEach((u, idx) => {
          cy.request("POST", `${Cypress.env("BACKEND")}/api/users`, u);
          cy.login(u);
          cy.fixture("testBlogs").then((blogs) => {
            blogs.forEach((blog, jdx) => {
              if (jdx === idx * 2 + 1 || jdx === idx * 2) {
                // each of the 3 users creates 2 blogs
                cy.createBlog(blog);
              }
            });
          });
        });
      });
      cy.clearAllLocalStorage();
      cy.visit("");
      cy.login(user);
    });
    it("A blog can be created", function () {
      let blogListLengthBefore;
      cy.get('div[data-testid="blog"]').then((response) => {
        blogListLengthBefore = response.length;
      });
      cy.contains("new blog").click();
      cy.get('input[data-testid="title-input"').type("testblog");
      cy.get('input[data-testid="author-input"').type("testauthor");
      cy.get('input[data-testid="url-input"').type("https://www.test.com");
      cy.get('button[data-testid="create-button"]').click();
      cy.contains("testblog by testauthor");
      cy.get('div[data-testid="blog"]').then((response) => {
        expect(response.length - blogListLengthBefore).to.equal(1);
      });
    });
    it("A user can like a blog", function () {
      cy.get('button[data-testid="view-button"]:first').click();
      cy.get('p[data-testid="likes"]:first').then((likes) => {
        cy.get("button[data-testid=like-button]").click();
        cy.get('p[data-testid="likes"]').should(
          "contain",
          `likes ${parseInt(likes[0].textContent.replace("likes ", "")) + 1}`,
        );
      });
    });
    it("The user who created the blog can delete it", function () {
      cy.contains("new blog").click();
      cy.get('input[data-testid="title-input"').type("testblog");
      cy.get('input[data-testid="author-input"').type("testauthor");
      cy.get('input[data-testid="url-input"').type("https://www.test.com");
      cy.get('button[data-testid="create-button"]').click();
      cy.contains("testblog by testauthor").parent().contains("view").click();
      cy.get('button[data-testid="delete-button"]').click();
      cy.on("window:confirm", (str) => {
        expect(str).to.eq("Are you sure to remove testblog by testauthor?");
      });
      cy.contains("testblog by testauthor").should("not.exist");
    });
    it("The user cannot delete a blog created by another user", function () {
      cy.get('div[data-testid="blog"]:first').contains("view").click();
      cy.get('[data-testid="blog-user-name"]').should("not.contain", user.name);
      cy.get('button[data-testid="delete-button"]').should("not.exist");
    });
    it("A blog can be created", function () {
      let blogListLengthBefore;
      cy.get('div[data-testid="blog"]').then((response) => {
        blogListLengthBefore = response.length;
      });
      cy.contains("new blog").click();
      cy.get('input[data-testid="title-input"').type("testblog");
      cy.get('input[data-testid="author-input"').type("testauthor");
      cy.get('input[data-testid="url-input"').type("https://www.test.com");
      cy.get('button[data-testid="create-button"]').click();
      cy.contains("testblog by testauthor");
      cy.get('div[data-testid="blog"]').then((response) => {
        expect(response.length - blogListLengthBefore).to.equal(1);
      });
    });
    it("A user can like a blog", function () {
      cy.get('button[data-testid="view-button"]:first').click();
      cy.get('p[data-testid="likes"]:first').then((likes) => {
        cy.get("button[data-testid=like-button]").click();
        cy.get('p[data-testid="likes"]').should(
          "contain",
          `likes ${parseInt(likes[0].textContent.replace("likes ", "")) + 1}`,
        );
      });
    });
    it("The user who created the blog can delete it", function () {
      cy.contains("new blog").click();
      cy.get('input[data-testid="title-input"').type("testblog");
      cy.get('input[data-testid="author-input"').type("testauthor");
      cy.get('input[data-testid="url-input"').type("https://www.test.com");
      cy.get('button[data-testid="create-button"]').click();
      cy.contains("testblog by testauthor").parent().contains("view").click();
      cy.get('button[data-testid="delete-button"]').click();
      cy.on("window:confirm", (str) => {
        expect(str).to.eq("Are you sure to remove testblog by testauthor?");
      });
      cy.contains("testblog by testauthor").should("not.exist");
    });
    it("The user cannot delete a blog created by another user", function () {
      cy.get('div[data-testid="blog"]:first').contains("view").click();
      cy.get('[data-testid="blog-user-name"]').should("not.contain", user.name);
      cy.get('button[data-testid="delete-button"]').should("not.exist");
    });
    it("blogs are sorted by number of likes in descending order", function () {
      cy.get('button[data-testid="view-button"]')
        .wait(1)
        .click({ multiple: true });
      cy.get('p[data-testid="likes"]').each(($like, index, $likes) => {
        //compare likes to blog before; difference must be positive
        if (index >= 1) {
          expect(
            parseInt($likes[index - 1].innerText.replace("likes ", "")) -
              parseInt($like[0].innerText.replace("likes ", "")),
          ).to.be.at.least(0);
        }
      });
    });
  });
});
