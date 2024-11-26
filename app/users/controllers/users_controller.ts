import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, updateUserValidator } from '#app/users/validators/user_validator'
import User from '#models/user'
import { searchValidator } from '#app/commons/validators/searchable'

export default class UsersController {
  async index({ inertia, request }: HttpContext) {
    const { page, limit, search } = await request.validateUsing(searchValidator)

    const users = await User.query()
      .withScopes((scopes) => scopes.search(search))
      .paginate(page ?? 1, limit ?? 20)

    //todo: Modifying the route path
    return inertia.render('manager/users/overview', { users })
  }

  async create({ inertia }: HttpContext) {
    //todo: Modifying the route path
    return inertia.render('users/create')
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)
    await User.create(data)

    return response.redirect().toRoute('users.index')
  }

  async show({ inertia, params }: HttpContext) {
    const user = await User.query().where('uid', params.uid).firstOrFail()
    //todo: Modifying the route path
    return inertia.render('users/show', { user })
  }

  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(updateUserValidator(params.uid))
    const user = await User.findByOrFail('uid', params.uid)

    await user.merge(data).save()
    return response.redirect().toRoute('manager.users.index')
  }

  async delete({ response, params }: HttpContext) {
    const user = await User.findByOrFail('uid', params.uid)

    await user.delete()
    return response.redirect().toRoute('users.index')
  }
}
