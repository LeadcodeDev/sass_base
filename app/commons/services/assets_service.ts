import StringHelper from '@adonisjs/core/helpers/string'
import app from '@adonisjs/core/services/app'
import path from 'node:path'
import sharp from 'sharp'
import * as fs from 'node:fs'
import { UploadedFile } from '#app/commons/types/index'

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

      fs.unlink(app.tmpPath() + `/${key}.${file.extname}`, (err) => {
        if (err) throw err
      })
    } catch (e) {
      console.error(e)
    }

    return key
  }
}
