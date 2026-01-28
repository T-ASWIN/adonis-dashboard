import type { HttpContext } from '@adonisjs/core/http'
import Movie from '#models/movie'
import MovieStatus from '#models/movie_status'
import MovieService from '#services/movie_service'

export default class MoviesController {
  async index({ request, view }: HttpContext) {
    // const movies = await Movie.all()
    const qs = request.qs()
    const movies = await MovieService.getFiltered(qs)

    const movieStatuses = await MovieStatus.query().orderBy('name').select('id', 'name')

    const movieSortOptions=MovieService.sortOptions

    return view.render('pages/movies/index', {
      movies,
      movieStatuses,
      movieSortOptions,
      filters: qs,
    })
  }

  async show({ view, params }: HttpContext) {
    const movie = await Movie.findByOrFail('slug', params.slug)
    const cast = await movie.related('castMembers').query().orderBy('pivot_sort_order')
    const crew = await movie
      .related('crewMembers')
      .query()
      .wherePivot('title', 'Sound Mixer')
      .pivotColumns(['title', 'sort_order'])
      .orderBy('pivot_sort_order')

    await movie.load('director')
    await movie.load('writer')

    return view.render('pages/movies/show', { movie, cast, crew })
  }
}
