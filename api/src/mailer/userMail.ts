import winston from 'winston'

import { Mailer } from './mailer'

export class UserMail extends Mailer {
  public async signUp({ email }: { email: string }) {
    try {
      console.log('signUp email to ', email)
      await this.mailer.send({
        template: 'signUp',
        message: {
          from: `"Sign Up" ${process.env.MAIL_USER}`,
          to: email,
          subject: 'Sign Up'
        }
      })
    } catch (error) {
      console.log('signUp error', error)
      winston.error(error)
    }
  }

  public async resetPassword({
    email,
    accessToken
  }: {
    email: string
    accessToken: string
  }) {
    try {
      await this.mailer.send({
        template: 'resetPassword',
        message: {
          from: `"Reset Password" ${process.env.MAIL_USER}`,
          to: email,
          subject: 'Reset Password'
        },
        locals: {
          accessToken
        }
      })
    } catch (error) {
      winston.error(error)
    }
  }

  public async verification({
    email,
    accessToken
  }: {
    email: string
    accessToken: string
  }) {
    try {
      await this.mailer.send({
        template: 'verification',
        message: {
          from: `"Verification" ${process.env.MAIL_USER}`,
          to: email,
          subject: 'Verification'
        },
        locals: {
          accessToken
        }
      })
    } catch (error) {
      winston.error(error)
    }
  }

  public async successfullyVerified({ email }: { email: string }) {
    try {
      await this.mailer.send({
        template: 'successfullyVerified',
        message: {
          from: `"Successfully verified" ${process.env.MAIL_USER}`,
          to: email,
          subject: 'Successfully verified'
        }
      })
    } catch (error) {
      winston.error(error)
    }
  }

  public async successfullyUpdatedProfile({ email }: { email: string }) {
    try {
      await this.mailer.send({
        template: 'successfullyUpdatedProfile',
        message: {
          from: `"Successfully updated profile" ${process.env.MAIL_USER}`,
          to: email,
          subject: 'Successfully updated profile'
        }
      })
    } catch (error) {
      winston.error(error)
    }
  }

  public async successfullyUpdatedEmail({ email }: { email: string }) {
    try {
      await this.mailer.send({
        template: 'successfullyUpdatedEmail',
        message: {
          from: `"Successfully updated email" ${process.env.MAIL_USER}`,
          to: email,
          subject: 'Successfully updated email'
        }
      })
    } catch (error) {
      winston.error(error)
    }
  }

  public async successfullyUpdatedPassword({ email }: { email: string }) {
    try {
      await this.mailer.send({
        template: 'successfullyUpdatedPassword',
        message: {
          from: `"Successfully updated password" ${process.env.MAIL_USER}`,
          to: email,
          subject: 'Successfully updated password'
        }
      })
    } catch (error) {
      winston.error(error)
    }
  }

  public async successfullyDeleted({ email }: { email: string }) {
    try {
      await this.mailer.send({
        template: 'successfullyDeleted',
        message: {
          from: `"Successfully deleted" ${process.env.MAIL_USER}`,
          to: email,
          subject: 'Successfully deleted'
        }
      })
    } catch (error) {
      winston.error(error)
    }
  }
}
