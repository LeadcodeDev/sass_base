import type { HttpContext } from '@adonisjs/core/http'
import Permission from '#models/permission'
import {
  createPermissionValidator,
  updatePermissionValidator,
} from '#app/bouncer/validators/permissions_validator'

export default class PermissionController {
  async index({ request, inertia }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    const permissions = await Permission.query().paginate(page, limit)
    //todo: Modifying the route path
    return inertia.render('', { permissions })
  }

  async create({ inertia }: HttpContext) {
    //todo: Modifying the route path
    return inertia.render('')
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createPermissionValidator)
    await Permission.create(data)

    return response.redirect().toRoute('permissions.index')
  }

  async edit({ inertia, params }: HttpContext) {
    const permission = await Permission.query().where('id', params.id).firstOrFail()
    //todo: Modifying the route path
    return inertia.render('', { permission })
  }

  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(updatePermissionValidator)
    const permission = await Permission.findOrFail(params.id)

    await permission.merge(data).save()

    return response.redirect().toRoute('permissions.index')
  }

  async delete({ response, params }: HttpContext) {
    const permission = await Permission.query().where('id', params.id).firstOrFail()
    await permission.delete()

    return response.redirect().toRoute('permissions.index')
  }
}
