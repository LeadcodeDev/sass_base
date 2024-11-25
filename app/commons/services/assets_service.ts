import { randomUUID } from 'node:crypto'
import env from '#start/env'
import drive from '@adonisjs/drive/services/main'

export default class AssetsService {
  async upload(file: any) {
    const key = `${randomUUID()}.${file.extname}`
    await file.moveToDisk(key, env.get('DRIVE_DISK'), {
      contentType: 'image/png',
    })

    return key
  }

  async getUrl(key: string) {
    const disk = drive.use()
    return disk.getUrl(key)
  }
}
