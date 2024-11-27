import type { HttpContext } from '@adonisjs/core/http'
import {
  createUserValidator,
  updateUserValidator,
  userSearchValidator,
} from '#app/accounts/validators/user_validator'
import User from '#models/user'

export default class UsersController {
  async index({ inertia, request }: HttpContext) {
    const { page, limit, search, type, isActive } = await request.validateUsing(userSearchValidator)

    const users = await User.query()
      .withScopes((scopes) => scopes.search(search, type, isActive))
      .paginate(page ?? 1, limit ?? 20)

    return inertia.render('manager/accounts/users_overview', { users })
  }

  async create({ inertia }: HttpContext) {
    //todo: Modifying the route path
    return inertia.render('accounts/create')
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)
    await User.create(data)

    return response.redirect().toRoute('manager.accounts.index')
  }

  async show({ inertia, params }: HttpContext) {
    const user = await User.query().where('uid', params.uid).firstOrFail()
    //todo: Modifying the route path
    return inertia.render('accounts/show', { user })
  }

  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(updateUserValidator(params.uid))
    const user = await User.findByOrFail('uid', params.uid)

    await user.merge(data).save()
    return response.redirect().toRoute('manager.accounts.index')
  }

  async delete({ response, params }: HttpContext) {
    const user = await User.findByOrFail('uid', params.uid)

    await user.delete()
    return response.redirect().toRoute('manager.accounts.index')
  }
}
