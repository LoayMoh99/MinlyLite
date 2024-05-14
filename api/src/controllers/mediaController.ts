import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import winston from 'winston'

import { imageService, mediaService } from '@/services'
import { Image } from '@/infrastructure/image'
import { ICombinedRequest, IContextRequest, IQueryRequest, IUserRequest } from '@/contracts/request'
import { appUrl } from '@/utils/paths'
import { CreateMediaPayload, ListingMediaPayload } from '@/contracts/media'

export const mediaController = {

  mediaListing: async (
    { query }: IQueryRequest<ListingMediaPayload>,
    res: Response
  ) => {
    console.log('params ', query)
    try {
      const media = await mediaService.paginatedListing(query)

      return res.status(StatusCodes.OK).json({
        data: { ...media },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      })
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      })
    }
  },

  mediaCreate: async (
    {
      context: { user },
      body: mediaBody
    }: ICombinedRequest<IUserRequest, CreateMediaPayload>,
    res: Response
  ) => {
    try {
      const media = await mediaService.create(mediaBody, user)

      return res.status(StatusCodes.OK).json({
        data: { id: media.id },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      })
    } catch (error) {
      console.log(error)
      winston.error(error)

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      })
    }
  },

  imageUpload: async (
    { file }: IContextRequest<IUserRequest>,
    res: Response
  ) => {
    try {
      const image = await imageService.create(file as Express.Multer.File)

      const imageUrl = appUrl(
        await new Image(image).sharp({ width: 150, height: 150 })
      )

      return res.status(StatusCodes.OK).json({
        data: { id: image.id, image: imageUrl },
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
