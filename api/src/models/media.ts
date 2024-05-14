import { Schema, model } from 'mongoose'

import { IMedia, MediaModel } from '@/contracts/media'
import { MediaRefType } from '@/constants'

const schema = new Schema<IMedia, MediaModel>(
  {
    title: {
      type: String,
      default: "New Media",
    },
    description: {
      type: String,
      default: null,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    dislikesCount: {
      type: Number,
      default: 0,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: MediaRefType.User,
      required: true,
    },
    userName: {
      type: String,
      default: "Anonymous",
    }
  },
  { timestamps: true }
)

export const Media = model<IMedia, MediaModel>('Media', schema)
