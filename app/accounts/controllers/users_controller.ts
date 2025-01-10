import type { HttpContext } from '@adonisjs/core/http'
import {
  createUserValidator,
  updateUserValidator,
  userSearchValidator,
} from '#app/accounts/validators/user_validator'
import User from '#models/user'
import { inject } from '@adonisjs/core'
import AssetsService from '#app/commons/services/assets_service'
import db from '@adonisjs/lucid/services/db'
import Role from '#models/role'

@inject()
export default class UsersController {
  constructor(protected assetsService: AssetsService) {}

  async index({ inertia, request }: HttpContext) {
    const { page, limit, search, type, status } = await request.validateUsing(userSearchValidator)

    const users = await User.query()
      .withScopes((scopes) => scopes.search(search, type, status))
      .preload('roles')
      .paginate(page ?? 1, limit ?? 20)

    return inertia.render('manager/accounts/users/users_overview', { users })
  }

  async deleteToken({ response, params }: HttpContext) {
    const user = await User.query().where('uid', params.uid).firstOrFail()
    await db.query().from('auth_access_tokens').where('tokenable_id', user.id).delete()

    return response.redirect().back()
  }

  async create({ inertia }: HttpContext) {
    const roles = await Role.query()
    return inertia.render('manager/accounts/users/user_create_page', { roles })
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)

    const user = await User.create({
      ...data,
      avatar: data.avatar ? await this.assetsService.convertAndUpload(data.avatar) : null,
    })

    if (data.permissions) {
      await user.related('permissions').sync(data.permissions)
    }

    if (data.roles) {
      await user.related('roles').sync(data.roles)
    }

    return response.redirect().toRoute('manager.users.index')
  }

  async show({ inertia, params }: HttpContext) {
    const user = await User.query().where('uid', params.uid).firstOrFail()
    return inertia.render('accounts/show', { user })
  }

  async edit({ inertia, params }: HttpContext) {
    const user = await User.query().where('uid', params.uid).firstOrFail()
    const roles = await Role.query()
    const connexions = await User.accessTokens.all(user)

    return inertia.render('manager/accounts/users/user_edit_page', { user, roles, connexions })
  }

  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(updateUserValidator(params.uid))
    const user = await User.findByOrFail('uid', params.uid)

    await user
      .merge({
        ...data,
        avatar: data.avatar ? await this.assetsService.convertAndUpload(data.avatar) : user.avatar,
      })
      .save()

    if (data.permissions) {
      await user.related('permissions').sync(data.permissions)
    }

    if (data.roles) {
      await user.related('roles').sync(data.roles)
    }
    return response.redirect().toRoute('manager.users.index')
  }

  async delete({ response, params }: HttpContext) {
    const user = await User.findByOrFail('uid', params.uid)

    await user.related('permissions').detach()
    await user.related('roles').detach()

    await user.delete()
    return response.redirect().toRoute('manager.users.index')
  }
}
