import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import winston from 'winston'

import { imageService, mediaService } from '@/services'
import { ICombinedRequest, IContextRequest, IParamsRequest, IQueryRequest, IUserRequest } from '@/contracts/request'
import { CreateMediaPayload, ListingMediaPayload, MediaTakeActionPayload } from '@/contracts/media'
import { mediaUrls, videoUrls } from '@/seeds'

export const mediaController = {

  mediaSeeding: async (
    _: IParamsRequest<{}>,
    res: Response
  ) => {
    // create a dummy user using this id 664122f9ef946f0d7514f5db
    const user: any = {
      id: '664122f9ef946f0d7514f5db',
      firstName: 'Loay',
      lastName: 'Mohamed'
    }

    // add some media as images and few as videos with dummy title and description
    for (let i = 0; i < 10; i++) {
      await mediaService.create({
        title: `Image ${i + 1}`,
        description: `This is image ${i + 1}`,
        mediaUrl: mediaUrls[i],
        type: 'image',
        likesCount: 0,
        dislikesCount: 0,
      }, user)
    }

    for (let i = 0; i < 5; i++) {
      await mediaService.create({
        title: `Video ${i + 1}`,
        description: `This is video ${i + 1}`,
        mediaUrl: videoUrls[i % 2],
        type: 'video',
        likesCount: 0,
        dislikesCount: 0,
      }, user)
    }
    return res.status(StatusCodes.OK).json({
      data: { message: "✅ Seeds executed successfully" },
      message: ReasonPhrases.OK,
      status: StatusCodes.OK
    })
  },

  // can take user bearer token and return the media listing
  mediaListing: async (
    {
      context: { user },
      query: query
    }: ICombinedRequest<IUserRequest, ListingMediaPayload>,
    res: Response
  ) => {
    try {
      const media = await mediaService.paginatedListing(query, user)

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

  mediaTakeAction: async (
    {
      context: { user },
      body: mediaActionBody
    }: ICombinedRequest<IUserRequest, MediaTakeActionPayload>,
    res: Response
  ) => {
    try {
      const media = await mediaService.likeOrDislikeAction(mediaActionBody, user);

      return res.status(StatusCodes.OK).json({
        data: { id: media.id },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      })
    } catch (error) {
      console.log(error)
      winston.error(error)

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST + ' ' + error,
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

      return res.status(StatusCodes.OK).json({
        data: { id: image.id, image: 'imageUrl' },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      })
    } catch (error) {
      console.log(error)
      winston.error(error)

      //await new Image(file as Express.Multer.File).deleteFile()

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      })
    }
  }
}
