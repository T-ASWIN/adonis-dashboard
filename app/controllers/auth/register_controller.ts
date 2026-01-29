// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { registerValidator } from '#validators/auth'
import { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async show({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async store({ request, response, auth }: HttpContext) {
    //1.request data and validate it

    const data = await request.validateUsing(registerValidator)
    //2.create our user
    const user = await User.create(data)
    //3.create profile for user
await user.related('profile').create({})
    //3.login that user
    await auth.use('web').login(user)
    //4.return the user back to home
    return response.redirect().toRoute('home')
  }
}
