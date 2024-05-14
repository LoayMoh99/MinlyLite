import { Model, ObjectId } from 'mongoose'

export interface IImage {
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
  orderColumn?: number
  refType?: string
  refId?: ObjectId
}

export type CreateImagePayload = Omit<
  IImage,
  'refId' | 'refType' | 'orderColumn'
>

export type UpdateImagePayload = Pick<IImage, 'refId' | 'refType'>

export type ImageModel = Model<IImage>
