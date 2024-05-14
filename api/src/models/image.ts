import { Schema, model } from 'mongoose'

import { IImage, ImageModel } from '@/contracts/image'

const schema = new Schema<IImage, ImageModel>(
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

export const Image = model<IImage, ImageModel>('Image', schema)
