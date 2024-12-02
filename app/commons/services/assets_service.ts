import StringHelper from '@adonisjs/core/helpers/string'
import app from '@adonisjs/core/services/app'
import path from 'node:path'
import sharp from 'sharp'
import * as fs from 'node:fs'
// import { UploadedFile } from '#app/commons/types/index'
import drive from '@adonisjs/drive/services/main'

export default class AssetsService {
  async convertAndUpload(file: any): Promise<string> {
    const key = `${StringHelper.generateRandom(10)}`

    try {
      await file.move(app.tmpPath(), {
        name: `${key}.${file.extname}`,
      })

      const webpFilePath = path.join(app.tmpPath(), `${key}.webp`)
      await sharp(app.tmpPath() + `/${key}.${file.extname}`)
        .webp({ quality: 80 })
        .toFile(webpFilePath)

      const disk = drive.use()
      await disk.put(`${key}.webp`, path.join(app.tmpPath()))
    } catch (e) {
      console.error(e)
    } finally {
      fs.rmSync(app.tmpPath(), { recursive: true })
    }

    return key
  }
}
