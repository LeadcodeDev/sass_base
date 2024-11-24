import { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'
import { createRoleValidator, updateRoleValidator } from '#app/bouncer/validators/roles_validator'

export default class RolesController {
  async index({ inertia }: HttpContext) {
    const roles = await Role.query().preload('permissions').preload('users')

    return inertia.render('permissions', { roles })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('')
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createRoleValidator)
    const role = await Role.create(data)

    if (data.permissions) {
      await role.related('permissions').sync(data.permissions)
    }

    return response.redirect().toRoute('roles.index')
  }

  async edit({ params, inertia }: HttpContext) {
    const role = Role.query().where('id', params.id).firstOrFail()

    return inertia.render('permissions', { role })
  }

  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(updateRoleValidator)
    const role = await Role.findOrFail(params.id)

    console.log(data)

    if (data.permissions) {
      await role.related('permissions').sync(data.permissions)
    }

    role.merge(data)
    await role.save()

    return response.redirect().toRoute('roles.index')
  }

  async delete({ params, response }: HttpContext) {
    const role = await Role.findOrFail(params.id)
    await role.related('permissions').detach()
    await role.delete()

    return response.redirect().toRoute('roles.index')
  }
}
