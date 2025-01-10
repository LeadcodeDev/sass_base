import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import env from '#start/env'
import mail from '@adonisjs/mail/services/main'
import router from '@adonisjs/core/services/router'
// import {dd} from "@adonisjs/core/services/dumper";
import { resetPasswordValidator } from '#app/accounts/validators/user_validator'

export default class AuthenticationController {
  async login({ auth, response, inertia }: HttpContext) {
    if (auth.isAuthenticated) {
      return response.redirect().toRoute('home')
    }
    return inertia.render('manager/authentication/login_page')
  }

  async loginAction({ request, response }: HttpContext) {
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
    await User.accessTokens.delete(user as unknown as User, user.currentAccessToken.identifier)

    return response.redirect().toRoute('home')
  }

  async forgotPassword({ inertia }: HttpContext) {
    return inertia.render('manager/authentication/forgot_password_page')
  }

  async forgotPasswordAction({ request, response }: HttpContext) {
    // const resend = new Resend('resend')
    const email = request.only(['email']).email

    const userByEmail = await User.query().where('email', email).first()

    if (userByEmail) {
      const resetEmailUrl = router
        .builder()
        .prefixUrl('http://localhost:3333')
        .params({ uid: userByEmail.uid })
        .makeSigned('resetPassword', {
          expiresIn: '1 hour',
        })

      await mail.send((message) => {
        message
          .to(email)
          .from('alexbrgn.code@leadcode.fr')
          .subject('Testing email form Adonis')
          .text(resetEmailUrl)
      })
      return response.redirect().toRoute('home')
    } else {
      return response.response.statusCode === 404
    }
  }

  async resetPassword({ request, response, inertia, params }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.badRequest('Invalid or expired URL')
    }
    const user = await User.findBy('uid', params.uid)

    return inertia.render('manager/authentication/reset_password_page', { user })
  }

  async resetPasswordAction({ request, params }: HttpContext) {
    if (request.input('password') === request.input('password_confirmation')) {
      const data = await request.validateUsing(resetPasswordValidator)
      const user = await User.findBy('uid', params.uid)

      if (user) {
        user.merge(data)
        await user.save()
        return { message: 'Changement de mot de passe effectué' }
      } else {
        console.log(user)
      }
    }
  }
}
