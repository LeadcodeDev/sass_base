import router from '@adonisjs/core/services/router'
const UsersController = () => import('#app/users/controllers/users_controller')

router
  .group(() => {
    router.get('/users', [UsersController, 'index']).as('index')
    router.get('/users/create', [UsersController, 'create']).as('create')
    router.post('/users', [UsersController, 'store']).as('store')
    router.get('/users/:id', [UsersController, 'show']).as('show')
    router.put('/users/:uid', [UsersController, 'update']).as('update')
    router.delete('/users/:uid', [UsersController, 'delete']).as('delete')
  })
  .prefix('/users')
  .as('users')
