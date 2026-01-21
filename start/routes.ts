/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { Exception } from '@adonisjs/core/exceptions'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import fs from 'node:fs/promises'

router.on('/').render('pages/home')

router
  .get('/page/:slug', async (value) => {
    const url = app.makeURL(`resources/movies/${value.params.slug}.html`)
    try {
      const movie = await fs.readFile(url, 'utf8')
      value.view.share({ movie })
    } catch (error) {
      throw new Exception('could not find a movie called ${value.params.slug}', {
        code: 'E_NOT_FOUND',
        status: 404,
      })
    }
    return value.view.render('pages/movies/movie')
  })
  .as('web.index')
  .where('slug', router.matchers.slug())

router.on('/movie').render('pages/first')

// router.post('/', () => {}).as('home.store')

// router.get('/page/webpage/edit', async (value) => {}).as('web.edit')

// router.put('/pages/webpage', () => {}).as('web.update')

// router.get('/movies', () => {}).as('movie.index')

// router.get('/movies/my-movie', () => {}).as('movie.show')

// router.get('/movies/create', () => {}).as('movie.create')

// router.post('/movies', () => {}).as('movie.store')

// router.get('/movies/my-movie/edit', () => {}).as('movie.edit')

// router.put('/movies/mu-movie', () => {}).as('movie.update')

// router.delete('/movies/my-movie', () => {}).as('movie.destroy')
