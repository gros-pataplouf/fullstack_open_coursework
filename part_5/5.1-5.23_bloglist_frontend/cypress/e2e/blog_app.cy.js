/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('displays login form by default', function() {
    cy.get('form[data-testid=login-form]')
    cy.get('input[data-testid=login-username]')
    cy.get('input[data-testid=login-password]')
  })
})