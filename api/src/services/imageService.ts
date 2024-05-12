import { ClientSession, ObjectId } from 'mongoose'

import { Image } from '@/models'
import { CreateImagePayload, UpdateImagePayload } from '@/contracts/image'
import { ImageRefType } from '@/constants'

export const imageService = {
  getById: (imageId: ObjectId) => Image.findById(imageId),

  findOneByRef: ({
    refType,
    refId
  }: {
    refType: ImageRefType
    refId: ObjectId
  }) => Image.findOne({ refType, refId }),

  findManyByRef: ({
    refType,
    refId
  }: {
    refType: ImageRefType
    refId: ObjectId
  }) => Image.find({ refType, refId }),

  create: (
    {
      originalname,
      encoding,
      mimetype,
      destination,
      filename,
      path,
      size
    }: CreateImagePayload,
    session?: ClientSession
  ) =>
    new Image({
      originalname,
      encoding,
      mimetype,
      destination,
      filename,
      path,
      size
    }).save({ session }),

  updateById: (
    imageId: ObjectId,
    { refType, refId }: UpdateImagePayload,
    session?: ClientSession
  ) => {
    const data = [{ _id: imageId }, { refType, refId }]

    let params = null

    if (session) {
      params = [...data, { session }]
    } else {
      params = data
    }

    return Image.updateOne(...params)
  },

  deleteById: (imageId: ObjectId, session?: ClientSession) =>
    Image.deleteOne({ _id: imageId }, { session }),

  deleteManyByRef: (
    {
      refType,
      refId
    }: {
      refType: ImageRefType
      refId: ObjectId
    },
    session?: ClientSession
  ) => Image.deleteMany({ refType, refId }, { session })
}
