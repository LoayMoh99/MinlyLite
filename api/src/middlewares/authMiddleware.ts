import { NextFunction, Request, Response } from 'express'

import { getAccessTokenFromHeaders } from '@/utils/headers'
import { jwtVerify } from '@/utils/jwt'
import { userService } from '@/services'
import { redis } from '@/dataSources'
import { StatusCodes } from 'http-status-codes'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Object.assign(req, { context: {} })

    const { accessToken } = getAccessTokenFromHeaders(req.headers)
    if (!accessToken) return next()

    const { id } = jwtVerify({ accessToken })
    if (!id) return next()

    const isAccessTokenExpired = await redis.client.get(
      `expiredToken:${accessToken}`
    )
    if (isAccessTokenExpired) return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Access token has expired!',
      status: StatusCodes.UNAUTHORIZED
    })

    const user = await userService.getById(id)
    if (!user) return next()

    Object.assign(req, {
      context: {
        user,
        accessToken
      }
    })

    return next()
  } catch (error) {
    return next()
  }
}
