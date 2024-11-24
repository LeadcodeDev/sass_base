import router from '@adonisjs/core/services/router'
const RolesController = () => import('#app/bouncer/controllers/roles_controller')
const PermissionController = () => import('#app/bouncer/controllers/permissions_controller')

router
  .group(() => {
    router.get('/', [PermissionController, 'index']).as('index')
    router.get('/create', [PermissionController, 'create']).as('create')
    router.post('/', [PermissionController, 'store']).as('store')
    router.get('/:id', [PermissionController, 'edit']).as('edit')
    router.put('/:id', [PermissionController, 'update']).as('update')
    router.delete('/:id', [PermissionController, 'delete']).as('delete')
  })
  .prefix('/permissions')
  .as('permissions')

router
  .group(() => {
    router.get('/', [RolesController, 'index']).as('index')
    router.get('/create', [PermissionController, 'create']).as('create')
    router.post('/', [RolesController, 'store']).as('store')
    router.get('/:id', [PermissionController, 'edit']).as('edit')
    router.put('/:id', [RolesController, 'update']).as('update')
    router.delete('/:id', [RolesController, 'delete']).as('delete')
  })
  .prefix('/roles')
  .as('roles')
