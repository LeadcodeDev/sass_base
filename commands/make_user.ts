import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class MakeUser extends BaseCommand {
  static commandName = 'make:user'
  static description = 'Create a new User'
  static help = ['Requires a lastname, firstname, email and password']
  static options: CommandOptions = {
    startApp: true,
  }

  async interact() {
    this.logger.info('Creating user')
  }

  async run() {
    const { default: User } = await import('#app/commons/models/user')

    try {
      const firstname = await this.prompt.ask('Enter the firstname')
      const lastname = await this.prompt.ask('Enter the lastname')
      const email = await this.prompt.ask('Enter the email')
      const password = await this.prompt.ask('Enter the password')

      await User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      })

      this.logger.success('Successfully created user')
    } catch (error) {
      this.logger.error(error.message)
      this.error = error
      this.exitCode = 1
    }
  }
}
