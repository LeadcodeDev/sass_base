import router from '@adonisjs/core/services/router'
const UsersController = () => import('#app/users/controllers/users_controller')

router.post('/users', [UsersController, 'store'])
