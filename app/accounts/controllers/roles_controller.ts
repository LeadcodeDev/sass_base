import { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'
import {
  createRoleValidator,
  roleSearchValidator,
  updateRoleValidator,
} from '#app/accounts/validators/roles_validator'
import Permission from '#models/permission'

export default class RolesController {
  async index({ request, inertia }: HttpContext) {
    const { page, limit, search, forAdmin } = await request.validateUsing(roleSearchValidator)

    const roles = await Role.query()
      .withScopes((scopes) => scopes.search(search, forAdmin))
      .preload('permissions')
      .preload('users')
      .paginate(page ?? 1, limit ?? 20)

    const contentType = request.header('Content-Type')
    if (contentType === 'application/json') {
      return roles
    }

    return inertia.render('manager/accounts/roles_overview', { roles })
  }

  async create({ request }: HttpContext) {
    const bestMatch = request.header('Content-Type')
    if (bestMatch === 'application/json') {
      return Permission.all()
    }
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createRoleValidator)
    const role = await Role.create(data)

    if (data.permissions) {
      await role.related('permissions').sync(data.permissions)
    }

    return response.redirect().toRoute('manager.roles.index')
  }

  async edit({ params, inertia }: HttpContext) {
    const role = await Role.findByOrFail('uid', params.uid)

    return inertia.render('permissions', { role })
  }

  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(updateRoleValidator)
    const role = await Role.findByOrFail('uid', params.uid)

    if (data.permissions) {
      await role.related('permissions').sync(data.permissions)
    }

    await role.merge(data).save()

    return response.redirect().toRoute('manager.roles.index')
  }

  async delete({ params, response }: HttpContext) {
    const role = await Role.findByOrFail('uid', params.uid)
    await role.related('permissions').detach()
    await role.delete()

    return response.redirect().toRoute('manager.roles.index')
  }
}
