import router from '@adonisjs/core/services/router'
const AuthenticationController = () =>
  import('#app/authentication/controllers/authentication_controller')
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/signin', [AuthenticationController, 'viewSignin'])
    router.post('/signin', [AuthenticationController, 'signin'])
    router.post('/signout', [AuthenticationController, 'logout']).use(middleware.auth())
  })
  .prefix('/auth')
