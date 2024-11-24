import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#app/users/validators/user_validator'
import User from '#models/user'

export default class UsersController {
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)

    return await User.create(data)
  }
}
