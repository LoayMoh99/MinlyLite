import { ClientSession, Document, ObjectId } from 'mongoose'

import { Media } from '@/models'
import { CreateMediaPayload, UpdateMediaPayload } from '@/contracts/media'
import { getSortingCriteria } from '@/utils/sortCriteria'
import { ListingMediaPayload } from '@/contracts/media'
import { IUser } from '@/contracts/user'
import { getUserName } from '@/utils/userName'

export const mediaService = {

  paginatedListing: async ({ pageNo = 1, pageSize = 10, sortBy = 'new' }: ListingMediaPayload) => {
    const sortingCriteria: any = getSortingCriteria(sortBy);
    const medias = await Media.find().sort(sortingCriteria).skip((pageNo - 1) * pageSize).limit(pageSize);

    const total = await Media.countDocuments()

    return { medias, total }
  },

  getById: (mediaId: ObjectId) => Media.findById(mediaId),

  create: (payload: CreateMediaPayload, user: Omit<IUser, 'id'> & Document, session?: ClientSession) => {
    const media = new Media({
      ...payload,
      userId: user.id,
      userName: getUserName(user),
    })

    return media.save({ session })
  },

  update: (mediaId: ObjectId, payload: UpdateMediaPayload, session?: ClientSession) =>
    Media.findByIdAndUpdate(mediaId, payload, { session }),

  delete: (mediaId: ObjectId, session?: ClientSession) => Media.findByIdAndDelete(mediaId, { session }),

}
