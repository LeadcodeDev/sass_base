import type { HttpContext } from '@adonisjs/core/http'
import Permission from '#models/permission'
import {
  createPermissionValidator,
  permissionSearchValidator,
  updatePermissionValidator,
} from '#app/accounts/validators/permissions_validator'

export default class PermissionController {
  async index({ request, inertia }: HttpContext) {
    const { page, limit, search, forAdmin } = await request.validateUsing(permissionSearchValidator)

    const permissions = await Permission.query()
      .withScopes((scopes) => scopes.search(search, forAdmin))
      .paginate(page ?? 1, limit ?? 20)

    const contentType = request.accepts(['html', 'json'])
    if (contentType === 'json') {
      return permissions
    }

    return inertia.render('manager/accounts/permissions/permissions_overview', { permissions })
  }

  async create({ inertia }: HttpContext) {
    //todo: Modifying the route path
    return inertia.render('')
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createPermissionValidator)
    await Permission.create(data)

    return response.redirect().toRoute('manager.permissions.index')
  }

  async edit({ inertia, params }: HttpContext) {
    const permission = await Permission.query().where('id', params.id).firstOrFail()
    //todo: Modifying the route path
    return inertia.render('', { permission })
  }

  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(updatePermissionValidator)
    const permission = await Permission.findByOrFail('uid', params.uid)

    await permission.merge(data).save()

    return response.redirect().toRoute('manager.permissions.index')
  }

  async delete({ response, params }: HttpContext) {
    const permission = await Permission.query().where('uid', params.uid).firstOrFail()
    await permission.delete()

    return response.redirect().toRoute('manager.permissions.index')
  }
}
