import { Router } from 'express'

import { authGuard } from '@/guards'
import { mediaController } from '@/controllers'
import { uploadSingleImageMiddleware } from '@/middlewares'
import { mediaValidation } from '@/validations/mediaValidation'

export const media = (router: Router): void => {
  // upload image manually to our server and return the URL
  router.post(
    '/media/image/upload',
    authGuard.isAuth,
    uploadSingleImageMiddleware,
    mediaController.imageUpload
  )

  // add/update a post
  router.post(
    '/media/post',
    authGuard.isAuth,
    mediaValidation.deleteProfile, // TODO: change it
    mediaController.imageUpload // TODO: change it
  )

  // get a single post
  router.get(
    '/media/post/:postId',
    authGuard.isAuth,
    mediaValidation.deleteProfile, // TODO: change it
    mediaController.imageUpload // TODO: change it 
  )

  // listing posts
  router.get(
    '/media/posts',
    authGuard.isAuth,
    mediaValidation.deleteProfile, // TODO: change it
    mediaController.imageUpload // TODO: change it
  )

  // like/unlike a post
  router.post(
    '/media/like-unlike',
    authGuard.isAuth,
    mediaValidation.deleteProfile, // TODO: change it
    mediaController.imageUpload // TODO: change it
  )
}
