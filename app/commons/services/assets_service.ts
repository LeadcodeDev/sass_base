import StringHelper from '@adonisjs/core/helpers/string'
import app from '@adonisjs/core/services/app'
import path from 'node:path'
import sharp from 'sharp'
import * as fs from 'node:fs'
import { UploadedFile } from '#app/commons/types/index'
import drive from '@adonisjs/drive/services/main'

export default class AssetsService {
  async convertAndUpload(file: UploadedFile) {
    const key = `${StringHelper.generateRandom(10)}`

    await file.move(app.tmpPath(), {
      name: `${key}.${file.extname}`,
    })

    try {
      const webpFilePath = path.join(app.tmpPath(), `${key}.webp`)
      await sharp(app.tmpPath() + `/${key}.${file.extname}`)
        .webp({ quality: 80 })
        .toFile(webpFilePath)

      const disk = drive.use()
      await disk.put(`${key}.webp`, path.join(app.tmpPath()))

      fs.unlinkSync(app.tmpPath() + `/${key}.${file.extname}`)
      fs.unlinkSync(app.tmpPath() + `/${key}.webp`)
      fs.rmdirSync(app.tmpPath())
    } catch (e) {
      fs.unlinkSync(app.tmpPath() + `/${key}.${file.extname}`)
      fs.rmdirSync(app.tmpPath())
      console.error(e)
    }

    return key
  }
}
