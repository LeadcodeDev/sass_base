import router from '@adonisjs/core/services/router'
const UsersController = () => import('#app/users/controllers/users_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('overview', [UsersController, 'index']).as('index')
        router.get('create', [UsersController, 'create']).as('create')
        router.post('', [UsersController, 'store']).as('store')
        router.get(':uid', [UsersController, 'show']).as('show')
        router.put(':uid', [UsersController, 'update']).as('update')
        router.delete(':uid', [UsersController, 'delete']).as('delete')
      })
      .prefix('/accounts')
      .as('users')
  })
  .prefix('/manager')
  .as('manager')
