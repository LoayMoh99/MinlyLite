import { Model, ObjectId } from 'mongoose'

export interface ImageInterface {
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
  ImageInterface,
  'refId' | 'refType' | 'orderColumn'
>

export type UpdateImagePayload = Pick<ImageInterface, 'refId' | 'refType'>

export type ImageModel = Model<ImageInterface>
