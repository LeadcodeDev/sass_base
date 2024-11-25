import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, updateUserValidator } from '#app/users/validators/user_validator'
import User from '#models/user'
import { inject } from '@adonisjs/core'
import AssetsService from '#app/commons/services/assets_service'

@inject()
export default class UsersController {
  constructor(protected assetsService: AssetsService) {}

  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

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
    const avatar = request.file('avatar')!

    const avatarKey = await this.assetsService.upload(avatar)

    await User.create({
      ...data,
      avatar: await this.assetsService.getUrl(avatarKey),
      isActive: false,
    })

    return response.redirect().toRoute('users.index')
  }

  async show({ inertia, params }: HttpContext) {
    const user = await User.query().where('uid', params.uid).firstOrFail()
    //todo: Modifying the route path
    return inertia.render('users/show', { user })
  }

  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(updateUserValidator)
    const user = await User.findByOrFail('uid', params.uid)

    await user.merge(data).save()
    return response.redirect().toRoute('users.index')
  }

  async delete({ response, params }: HttpContext) {
    const user = await User.findByOrFail('uid', params.uid)

    await user.delete()
    return response.redirect().toRoute('users.index')
  }
}
