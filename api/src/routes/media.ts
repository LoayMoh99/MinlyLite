import { Router } from 'express'

import { authGuard } from '@/guards'
import { mediaController } from '@/controllers'
import { mediaValidation } from '@/validations'
import { uploadSingleImageValidation } from '@/validations'

export const media = (router: Router): void => {
  // seeding media
  router.get(
    '/media/seeds',
    mediaController.mediaSeeding
  )
  // listing posts
  router.get(
    '/media/posts',
    mediaValidation.mediaListing,
    mediaController.mediaListing
  )

  // add a new post
  router.post(
    '/media/post',
    authGuard.isAuth,
    mediaValidation.mediaCreate,
    mediaController.mediaCreate
  )

  // REAST of CRUD - left TODO: delete, update, get post by id (but won't be implemented in Frontend)

  // like/unlike a post
  router.post(
    '/media/like-unlike',
    authGuard.isAuth,
    mediaValidation.mediaTakeAction,
    mediaController.mediaTakeAction
  )

  // upload image manually to our server and return the URL
  router.post(
    '/media/image/upload',
    authGuard.isAuth,
    uploadSingleImageValidation,
    mediaController.imageUpload
  )
}
