import { Router } from 'express'

import { authGuard } from '@/guards'
import { mediaController } from '@/controllers'
import { mediaValidation } from '@/validations'
import { uploadSingleImageValidation } from '@/validations'

export const media = (router: Router): void => {
  // listing posts
  router.get(
    '/media/posts',
    mediaValidation.mediaListing,
    mediaController.mediaListing
  )

  // add/update a post
  router.post(
    '/media/post',
    authGuard.isAuth,
    mediaValidation.mediaCreate,
    mediaController.mediaCreate
  )

  // get a single post
  router.get(
    '/media/post/:postId',
    authGuard.isAuth,
    mediaValidation.mediaCreate, // TODO: change it
    mediaController.imageUpload // TODO: change it 
  )

  // like/unlike a post
  router.post(
    '/media/like-unlike',
    authGuard.isAuth,
    mediaValidation.mediaCreate, // TODO: change it
    mediaController.imageUpload // TODO: change it
  )

  // upload image manually to our server and return the URL
  router.post(
    '/media/image/upload',
    authGuard.isAuth,
    uploadSingleImageValidation,
    mediaController.imageUpload
  )
}
