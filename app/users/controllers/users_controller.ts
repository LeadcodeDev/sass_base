import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, updateUserValidator } from '#app/users/validators/user_validator'
import User from '#models/user'

export default class UsersController {
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20

    const users = await User.query().paginate(page, limit)
    //todo: Modifying the route path
    return inertia.render('users/index', { users })
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

  async show({ inertia, response, session, params }: HttpContext) {
    const user = await User.query().where('uid', params.uid).first()

    if (!user) {
      session.flash('error', 'Aucun utilisateur trouvé.')
      return response.redirect().back()
    }
    //todo: Modifying the route path
    return inertia.render('users/show', { user })
  }

  async update({ request, response, session, params }: HttpContext) {
    const data = await request.validateUsing(updateUserValidator)
    const user = await User.findBy('uid', params.uid)
    if (!user) {
      session.flash('error', 'Aucun utilisateur trouvé.')
      return response.redirect().back()
    }

    await user.merge(data).save()
    return response.redirect().toRoute('users.index')
  }

  async delete({ response, session, params }: HttpContext) {
    const user = await User.findBy('uid', params.uid)
    if (!user) {
      session.flash('error', 'Aucun utilisateur trouvé.')
      return response.redirect().back()
    }

    await user.delete()
    return response.redirect().toRoute('users.index')
  }
}
