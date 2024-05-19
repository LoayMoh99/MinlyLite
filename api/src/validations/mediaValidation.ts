import { NextFunction, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import winston from 'winston'

import { IBodyRequest, IQueryRequest } from '@/contracts/request'
import { CreateMediaPayload, ListingMediaPayload, MediaTakeActionPayload } from '@/contracts/media'

export const mediaValidation = {
  mediaListing: (
    req: IQueryRequest<ListingMediaPayload>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // if no params are provided, set default values
      if (!req.query.pageNo || req.query.pageNo < 1) {
        req.query.pageNo = 1
      }

      // if no params are provided, set default values or limit the pageSize to 50
      if (!req.query.pageSize || req.query.pageSize > 50) {
        req.query.pageSize = 10
      }
      if (!req.query.sortBy) {
        req.query.sortBy = 'new'
      }
      // check if sortBy not of type MediaSorting 'new' | 'popular' | 'trending' | 'random'
      switch (req.query.sortBy) {
        case 'new':
        case 'popular':
        case 'trending':
        case 'random':
          break;
        default:
          //set default value if not of type MediaSorting
          req.query.sortBy = 'new'
          break;
      }

      return next()
    } catch (error) {
      winston.error(error)

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      })
    }
  },

  mediaCreate: (
    req: IBodyRequest<CreateMediaPayload>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.body.title || !req.body.mediaUrl || !req.body.type) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Invalid request for creating media",
          status: StatusCodes.BAD_REQUEST
        })
      }
      // limit title to be less than 50 characters
      if (req.body.title.length > 50) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Title should be less than 50 characters",
          status: StatusCodes.BAD_REQUEST
        })
      }

      return next()
    } catch (error) {
      winston.error(error)

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST + ' ' + error,
        status: StatusCodes.BAD_REQUEST
      })
    }
  },

  // for like and dislike actions
  mediaTakeAction: (
    req: IBodyRequest<MediaTakeActionPayload>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.body.mediaId || !req.body.action || (req.body.action !== 'like' && req.body.action !== 'dislike' && req.body.action !== 'neutral')) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Invalid request for like/dislike action",
          status: StatusCodes.BAD_REQUEST
        })
      }

      return next()
    } catch (error) {
      winston.error(error)

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST + ' ' + error,
        status: StatusCodes.BAD_REQUEST
      })
    }
  },

}
