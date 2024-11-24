import router from '@adonisjs/core/services/router'
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
