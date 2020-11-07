const user = {
  username: 'rRooterson',
  name: 'Rooterson',
  password: 'root'
}

const user2 = {
  username: 'temp',
  name: 'temp',
  password: 'temp'
}

const blog ={
  title: 'A cool title!',
  author: 'John Doe',
  url: 'www.url.io'
}

describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.request('POST', 'http://localhost:3001/api/users/', user) 
      cy.request('POST', 'http://localhost:3001/api/users/', user2) 
      cy.visit('http://localhost:3000')
    })
  
    it('Login from is shown', function() {
      cy.contains('Login to application')
      cy.get('#loginForm').contains('Username')
      cy.get('#loginForm').contains('Password')
    })

    describe('Login', function() {
      it('Login is succesful with correct credentials', function() {
        cy.get('#username').type('rRooterson')
        cy.get('#password').type('root')
        cy.get('#loginButton').click()
        cy.contains('Rooterson logged in')
      })

      it('Login fails with incorrect credentials', function() {
        cy.get('#username').type('WrongUsername')
        cy.get('#password').type('ThisIsNotCorrect')
        cy.get('#loginButton').click()
        cy.contains('Wrong username or password')
        cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      })
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login(user)  

        cy.get('#newBlogButton').click()
        cy.get('#blogTitle').type('A cool title!')
        cy.get('#blogAuthor').type('John Doe')
        cy.get('#blogUrl').type('www.url.io')
        cy.get('#createBlogButton').click()
        cy.contains('A cool title! by John Doe')
      })
    
      /*it.only('A blog can be created', function() {
        cy.get('#newBlogButton').click()
        cy.get('#blogTitle').type('A cool title!')
        cy.get('#blogAuthor').type('John Doe')
        cy.get('#blogUrl').type('www.url.io')
        cy.get('#createBlogButton').click()
        cy.contains('A cool title! by John Doe')
      })*/

      it('A blog can be liked', function() {
        cy.get('#viewBlogButton').click()
        cy.get('#likeBlogButton').click()
        cy.contains('likes 1')
      })

      it('Blog by the creator can be removed', function() {
        cy.get('#logoutButton').click()
        cy.get('#username').type('rRooterson')
        cy.get('#password').type('root')
        cy.get('#loginButton').click()

        cy.get('#viewBlogButton').click()

        cy.get('#removeBlogButton').click()
        cy.should('not.contain', 'A cool title! by John Doe')
      })

      it('If not creator => cant delete blog', function() {
        cy.get('#logoutButton').click()
        cy.get('#username').type('temp')
        cy.get('#password').type('temp')
        cy.get('#loginButton').click()

        cy.get('#viewBlogButton').click()
        cy.should('not.contain', '#removeBlogButton')
      })
    })
  })