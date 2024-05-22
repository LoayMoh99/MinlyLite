import { NextFunction, Request, Response } from 'express'

import { getSignatureFromHeaders } from '@/utils/headers'
import { validateSignature } from '@/utils/cryptoString'
import { StatusCodes } from 'http-status-codes'

export const signatureMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { signature } = getSignatureFromHeaders(req.headers?.signature)
    if (!signature || signature === '') return res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION).json({
      message: "Someone is trying to access this api without a signature!",
      status: StatusCodes.NON_AUTHORITATIVE_INFORMATION // 203
    })

    // validate that the signature is valid with our secret
    if (!validateSignature(signature)) return res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION).json({
      message: "No valid signature provided!",
      status: StatusCodes.NON_AUTHORITATIVE_INFORMATION // 203
    })

    return next()
  } catch (error) {
    return next()
  }
}
