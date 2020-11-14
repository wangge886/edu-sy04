
import express from 'express'
import router from "./advert";
import * as indexController from '../controllers/index'


router.get('/', indexController.showIndex)

export default router
