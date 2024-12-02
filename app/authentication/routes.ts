import router from '@adonisjs/core/services/router'
const AuthenticationController = () =>
  import('#app/authentication/controllers/authentication_controller')
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/login', [AuthenticationController, 'login'])
    router.post('/login', [AuthenticationController, 'loginAction'])
    router.post('/logout', [AuthenticationController, 'logout']).use(middleware.auth())
  })
  .prefix('/authentication')
