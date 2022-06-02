describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#Username').type('mluukkai')
      cy.get('#Password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
      cy.get('.success').contains('Login successful')
    })

    it('fails with wrong credentials', function () {
      cy.get('#Username').type('mcd')
      cy.get('#Password').type('saladn')
      cy.get('#login-button').click()
      cy.get('.error')
        .contains('Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a new blog can be created', function () {
      cy.contains('create new').click()
      cy.get('#Title').type('Canonical string reduction')
      cy.get('#Author').type('Edsger W. Dijkstra')
      cy.get('#Url').type(
        'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
      )
      cy.get('#create-button').click()
      cy.contains('Canonical string reduction')
    })

    describe(' a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'First class tests',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htm',
          likes: 0,
        })
      })

      it('users can like a blog', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('#likes').contains('1')
      })

      it('the user who created a blog can delete it', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'First class tests')
      })

      it('other users cannot delete the blo', function () {
        const user = {
          name: 'Crystal',
          username: 'root',
          password: 'cr987',
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.login({ username: 'root', password: 'cr987' })
        cy.contains('view').click()
        cy.get('#remove-button').should('not.exist')
      })

      it('checks that the blogs are ordered according to likes', function () {
        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 12,
        })
        cy.createBlog({
          title: 'TDD harms architecture',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
          likes: 15,
        })
        cy.createBlog({
          title: 'Type wars',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
          likes: 13,
        })
        cy.get('.blog').eq(0).should('contain', 'TDD harms architecture')
        cy.get('.blog').eq(1).should('contain', 'Type wars')
        cy.get('.blog')
          .eq(2)
          .should('contain', 'Go To Statement Considered Harmful')
      })
    })
  })
})
