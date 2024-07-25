const rootPath = '/genders'
import express, { Router } from 'express'
import {
  getGenders,
  getGender,
  createGender,
  updateGender,
  deleteGender,
} from '../controllers/genders.controller'

const router = Router()

router.use(express.json())

router.get(rootPath, getGenders)
router.get(`${rootPath}/:id`, getGender)
router.post(`${rootPath}/create`, createGender)
router.put(`${rootPath}/edit/:id`, updateGender)
router.delete(`${rootPath}/delete/:id`, deleteGender)

export default router
