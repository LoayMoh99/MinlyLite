import { ClientSession, Document, ObjectId } from 'mongoose'

import { Media } from '@/models'
import { CreateMediaPayload, MediaTakeActionPayload, UpdateMediaPayload } from '@/contracts/media'
import { getSortingCriteria } from '@/utils/sortCriteria'
import { ListingMediaPayload } from '@/contracts/media'
import { IUser } from '@/contracts/user'
import { getUserName } from '@/utils/userName'

export const mediaService = {

  paginatedListing: async ({ pageNo = 1, pageSize = 10, sortBy = 'new', search = '' }: ListingMediaPayload, user?: Omit<IUser, "id"> & Document) => {
    const sortingCriteria: any = getSortingCriteria(sortBy);

    const page = parseInt(pageSize.toString())

    // get the $likedMedia and $dislikedMedia fields from user document
    // add text search for title but using regex
    const medias = await Media.aggregate([
      {
        $match: {
          title: { $regex: search, $options: 'i' }
        }
      },
      {
        $sort: sortingCriteria
      },
      {
        $skip: (parseInt(pageNo.toString()) - 1) * page
      },
      {
        $limit: page
      },
      {
        $addFields: {
          like: {
            $cond: {
              if: {
                $in: ["$_id", user?.likedMedia ?? []]
              },
              then: 1,
              else: {
                $cond: {
                  if: {
                    $in: ["$_id", user?.dislikedMedia ?? []]
                  },
                  then: -1,
                  else: 0
                }
              }
            }
          }
        }
      },
    ]);


    //const medias = await Media.find().sort(sortingCriteria).skip((pageNo - 1) * pageSize).limit(pageSize);
    const currentSize = medias.length;

    return { data: medias, size: currentSize }
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

  likeOrDislikeAction: async ({ mediaId, action }: MediaTakeActionPayload, user: Omit<IUser, 'id'> & Document, session?: ClientSession) => {
    const media = await Media.findById(mediaId)

    if (!media) {
      throw new Error('Media not found')
    }

    const likedMedia = user.likedMedia ?? []
    const dislikedMedia = user.dislikedMedia ?? []

    if (action === 'like') {
      if (likedMedia.includes(mediaId)) {
        return media
      }

      if (dislikedMedia.includes(mediaId)) {
        media.dislikesCount = (media.dislikesCount ?? 0) - 1
      }

      media.likesCount = (media.likesCount ?? 0) + 1;
      likedMedia.push(mediaId)
      const index = dislikedMedia.indexOf(mediaId)
      if (index > -1) {
        dislikedMedia.splice(index, 1)
      }
    } else if (action === 'dislike') {
      if (dislikedMedia.includes(mediaId)) {
        return media
      }

      if (likedMedia.includes(mediaId)) {
        media.likesCount = (media.likesCount ?? 0) - 1;
      }

      media.dislikesCount = (media.dislikesCount ?? 0) + 1;
      dislikedMedia.push(mediaId)
      const index = likedMedia.indexOf(mediaId)
      if (index > -1) {
        likedMedia.splice(index, 1)
      }
    } else { // neutral (remove like/dislike)
      if (likedMedia.includes(mediaId)) {
        media.likesCount = (media.likesCount ?? 0) - 1;
        const index = likedMedia.indexOf(mediaId)
        if (index > -1) {
          likedMedia.splice(index, 1)
        }
      } else if (dislikedMedia.includes(mediaId)) {
        media.dislikesCount = (media.dislikesCount ?? 0) - 1;
        const index = dislikedMedia.indexOf(mediaId)
        if (index > -1) {
          dislikedMedia.splice(index, 1)
        }
      }
    }

    await user.updateOne({ likedMedia, dislikedMedia }, { session })

    return media.save({ session })
  }

}
