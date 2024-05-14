import { NextFunction, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import winston from 'winston'

import { IBodyRequest, IQueryRequest } from '@/contracts/request'
import { CreateMediaPayload, ListingMediaPayload } from '@/contracts/media'

export const mediaValidation = {
  mediaListing: (
    req: IQueryRequest<ListingMediaPayload>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // if no params are provided, set default values
      if (!req.query.pageNo) {
        req.query.pageNo = 1
      }
      if (!req.query.pageSize) {
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
          message: ReasonPhrases.BAD_REQUEST,
          status: StatusCodes.BAD_REQUEST
        })
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

}
