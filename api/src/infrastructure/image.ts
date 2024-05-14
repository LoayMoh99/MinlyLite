import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import fs from 'fs/promises'

import { IImage } from '@/contracts/image'
import { joinRelativeToMainPath } from '@/utils/paths'

export class Image {
  private image: Express.Multer.File | IImage

  private sharpInstance: Sharp

  constructor(image: Express.Multer.File | IImage) {
    this.image = image
  }

  public async sharp({
    width,
    height
  }: { width?: number; height?: number } = {}): Promise<string> {
    const isResize = width || height

    let fileName = this.image.filename
    if (isResize) {
      fileName = `${fileName}_${[width, height].join('x')}`
    }

    const imagePath = this.image.destination;
    const filePath = join(
      imagePath,
      `${fileName}.jpg`
    )

    const fileFullPath = joinRelativeToMainPath(filePath)

    if (await this.isFileExist(fileFullPath)) {
      return filePath
    }

    this.sharpInstance = sharp(joinRelativeToMainPath(this.image.path))
    if (isResize) {
      this.sharpInstance.resize(width, height)
    }

    await this.createDirectoryIfNeeded(joinRelativeToMainPath(imagePath))

    await this.saveFile(fileFullPath)

    return filePath
  }

  public async deleteFile() {
    try {
      const fileFullPath = joinRelativeToMainPath(this.image.path)

      if (await this.isFileExist(fileFullPath)) {
        await fs.unlink(fileFullPath)
      }

      const files = await fs.readdir(this.image.destination)

      const promises = files
        .filter(file => {
          const fileFullPath = join(this.image.destination, file)
          return (
            new RegExp(this.image.filename).test(file) &&
            this.isFileExist(fileFullPath)
          )
        })
        .map(file => {
          const fileFullPath = join(this.image.destination, file)
          return fs.unlink(fileFullPath)
        })

      await Promise.all(promises)
    } catch {
      return null
    }
  }

  private async isFileExist(filePath: string) {
    try {
      return await fs.stat(filePath)
    } catch {
      return null
    }
  }

  private async createDirectoryIfNeeded(directoryPath: string): Promise<void> {
    try {
      await fs.access(directoryPath)
    } catch {
      await fs.mkdir(directoryPath, { recursive: true })
    }
  }

  private async saveFile(fileFullPath: string) {
    try {
      await this.sharpInstance.toFile(fileFullPath)
    } catch {
      return null
    }
  }
}
