import { Model, ObjectId } from 'mongoose'

export type MediaType = 'image' | 'video' | 'text'
export type MediaSorting = 'new' | 'popular' | 'trending' | 'random'

export interface IMedia {
  title: string
  description?: string
  mediaUrl: string
  type: MediaType
  likesCount?: number
  dislikesCount?: number
  userId: ObjectId
  userName: string
}


export type ListingMediaPayload = {
  pageNo?: number
  pageSize?: number
  sortBy?: MediaSorting
}

export type CreateMediaPayload = Omit<IMedia, 'userId' | 'userName'>

export type UpdateMediaPayload = Pick<IMedia, 'userId' | 'userName'>

export type MediaModel = Model<IMedia>
