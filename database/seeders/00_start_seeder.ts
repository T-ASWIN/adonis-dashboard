import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Roles from '#enums/roles'
import MovieStatuses from '#enums/movie_statuses'
import MovieStatus from '#models/movie_status'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        id: Roles.USER,
        name: 'User',
      },
      {
        id: Roles.ADMIN,
        name: 'Admin',
      },
    ])

    await MovieStatus.createMany([
      {
        id: MovieStatuses.WRITING,
        name: 'Writing',
      },
      {
        id: MovieStatuses.CASTING,
        name: 'Casting',
      },
      {
        id: MovieStatuses.PRODUCTION,
        name: 'Production',
      },
      {
        id: MovieStatuses.POST_PRODUCTION,
        name: 'Post production',
      },
      {
        id: MovieStatuses.RELEASED,
        name: 'Released',
      },
    ])
  }
}
