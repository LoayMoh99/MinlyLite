import { Schema, model } from 'mongoose'

import { ImageInterface, ImageModel } from '@/contracts/image'

const schema = new Schema<ImageInterface, ImageModel>(
  {
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
    orderColumn: {
      type: Number,
      default: 0
    },
    refType: String,
    refId: { type: Schema.Types.ObjectId }
  },
  { timestamps: true }
)

export const Image = model<ImageInterface, ImageModel>('Image', schema)
