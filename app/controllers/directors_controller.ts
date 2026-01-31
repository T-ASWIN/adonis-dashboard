import Cineast from '#models/cineast'
import type { HttpContext } from '@adonisjs/core/http'

export default class DirectorsController {
  async index({ view }: HttpContext) {
    const directors = await Cineast.query()
      .whereHas('moviesDirected', (query) => query.apply((scope) => scope.released()))
      .orderBy([
        { column: 'firstName', order: 'asc' },
        { column: 'lastName', order: 'asc' },
      ])
    return view.render('pages/directors/index', { directors })
  }

  async show({ view, auth, params }: HttpContext) {
    console.log(params)

    const director = await Cineast.findOrFail(params.id)
    const movies = await director
      .related('moviesDirected')
      .query()
      .if(auth.user, (query) =>
        query.preload('watchlist', (watchlist) => watchlist.where('userId', auth.user!.id))
      )
      .orderBy('title')
    //SELECT * FROM movies WHERE director_id = 7 ORDER BY title ASC;

    return view.render('pages/directors/show', { director, movies })
  }
}
