import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import env from '#start/env'

export default class AuthenticationController {
  async viewSignin({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async signin({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    const oat = await User.accessTokens.create(user)

    response.cookie(env.get('AUTH_COOKIE'), oat.value!.release(), {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    })

    return response.redirect().toRoute('home')
  }
  async logout({ auth, response }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.redirect().toRoute('home')
  }
}
