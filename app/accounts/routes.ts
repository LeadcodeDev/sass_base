import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#app/accounts/controllers/users_controller')
const RolesController = () => import('#app/accounts/controllers/roles_controller')
const PermissionController = () => import('#app/accounts/controllers/permissions_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('overview', [UsersController, 'index']).as('index')
        router.delete('/:uid/delete-token', [UsersController, 'deleteToken']).as('deleteToken')
        router.get('create', [UsersController, 'create']).as('create')
        router.post('', [UsersController, 'store']).as('store')
        router.get(':uid', [UsersController, 'show']).as('show')
        router.get(':uid/edit', [UsersController, 'edit']).as('edit')
        router.put(':uid', [UsersController, 'update']).as('update')
        router.delete(':uid', [UsersController, 'delete']).as('delete')
      })
      .prefix('/users')
      .as('users')

    router
      .group(() => {
        router.get('/overview', [PermissionController, 'index']).as('index')
        router.get('/create', [PermissionController, 'create']).as('create')
        router.post('/', [PermissionController, 'store']).as('store')
        router.get('/:uid', [PermissionController, 'edit']).as('edit')
        router.put('/:uid', [PermissionController, 'update']).as('update')
        router.delete('/:uid', [PermissionController, 'delete']).as('delete')
      })
      .prefix('/permissions')
      .as('permissions')

    router
      .group(() => {
        router.get('/overview', [RolesController, 'index']).as('index')
        router.get('/create', [RolesController, 'create']).as('create')
        router.post('/', [RolesController, 'store']).as('store')
        router.get('/:uid/edit', [RolesController, 'edit']).as('edit')
        router.put('/:uid', [RolesController, 'update']).as('update')
        router.delete('/:uid', [RolesController, 'delete']).as('delete')
      })
      .prefix('/roles')
      .as('roles')
  })
  .prefix('/manager')
  .middleware(middleware.auth())
  .as('manager')
