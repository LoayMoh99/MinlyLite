import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import winston from 'winston'

import { imageService } from '@/services'
import { Image } from '@/infrastructure/image'
import { IContextRequest, IUserRequest } from '@/contracts/request'
import { appUrl } from '@/utils/paths'

export const mediaController = {
  imageUpload: async (
    { file }: IContextRequest<IUserRequest>,
    res: Response
  ) => {
    try {
      const image_doc = await imageService.create(file as Express.Multer.File)

      const image_url = appUrl(
        await new Image(image_doc).sharp({ width: 150, height: 150 })
      )

      return res.status(StatusCodes.OK).json({
        data: { id: image_doc.id, image: image_url },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      })
    } catch (error) {
      console.log(error)
      winston.error(error)

      await new Image(file as Express.Multer.File).deleteFile()

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      })
    }
  }
}
