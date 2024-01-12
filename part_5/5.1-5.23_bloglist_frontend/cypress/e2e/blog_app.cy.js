/* eslint-disable no-undef */
const user = { username: 'mp110', name: 'nomiddlename', password: 'neagley' }

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user)
    cy.visit('')
  })

  it('displays login form by default', function() {
    cy.get('form[data-testid="login-form"]')
    cy.get('input[data-testid="login-username"]')
    cy.get('input[data-testid="login-password"]')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[data-testid="login-username"]').type(user.username)
      cy.get('input[data-testid="login-password"]').type(user.password)
      cy.get('button[data-testid="login-button"]').click()
      cy.contains(`You are logged in as ${user.name}`)
    })

    it('fails with wrong credentials', function() {
      cy.get('input[data-testid="login-username"]').type(user.username)
      cy.get('input[data-testid="login-password"]').type('invalid')
      cy.get('button[data-testid="login-button"]').click()
      cy.get('[data-testid="warning"]')
        .should('be.visible')
        .and('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.fixture('testUsers').then(users => {
        users.forEach((u, idx) => {
          cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, u)
          cy.login(u)
          cy.fixture('testBlogs').then(blogs => {
            blogs.forEach((blog, jdx) => {
              if (jdx === idx * 2 + 1 || jdx === idx * 2 ) { // each of the 3 users creates 2 blogs
                cy.createBlog(blog)
              }
            })
          })
        })
      })
      cy.clearAllLocalStorage()
      cy.visit('')
      cy.login(user)
    })

    it('A blog can be created', function() {
      let blogListLengthBefore
      cy.get('div[data-testid="blog"]').then(response => {
        blogListLengthBefore = response.length
      })
      cy.contains('new blog').click()
      cy.get('input[data-testid="title-input"').type('testblog')
      cy.get('input[data-testid="author-input"').type('testauthor')
      cy.get('input[data-testid="url-input"').type('https://www.test.com')
      cy.get('button[data-testid="create-button"]').click()
      cy.contains('testblog by testauthor')
      cy.get('div[data-testid="blog"]').then(response => {
        expect(response.length - blogListLengthBefore).to.equal(1)
      })
    })
    it('A user can like a blog', function() {
      cy.get('button[data-testid="view-button"]:first').click()
      cy.get('p[data-testid="likes"]:first').then(likes => {
        cy.get('button[data-testid=like-button]').click()
        cy.get('p[data-testid="likes"]').should('contain', `likes ${parseInt(likes[0].textContent.replace('likes ', '')) + 1}`)
      })

    })
  })

})