import router from '@adonisjs/core/services/router'
const AuthenticationController = () =>
  import('#app/authentication/controllers/authentication_controller')
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/login', [AuthenticationController, 'login'])
    router.post('/login', [AuthenticationController, 'loginAction'])
    router.post('/logout', [AuthenticationController, 'logout']).use(middleware.auth())

    router.get('/forgot_password', [AuthenticationController, 'forgotPassword'])
    router.post('/forgot_password', [AuthenticationController, 'forgotPasswordAction'])

    router
      .get('/reset_password/:uid', [AuthenticationController, 'resetPassword'])
      .as('resetPassword')
    router.post('/reset_password/:uid', [AuthenticationController, 'resetPasswordAction'])
  })
  .prefix('/authentication')
