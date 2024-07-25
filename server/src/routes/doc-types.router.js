const rootPath = '/doc-types'
import express, { Router } from 'express'
import {
  getDocTypes,
  getDocType,
  createDocType,
  updateDocType,
  deleteDocType,
} from '../controllers/doc-types.controller'

const router = Router()

router.use(express.json())

router.get(rootPath, getDocTypes)
router.get(`${rootPath}/:id`, getDocType)
router.post(`${rootPath}/create`, createDocType)
router.put(`${rootPath}/edit/:id`, updateDocType)
router.delete(`${rootPath}/delete/:id`, deleteDocType)

export default router
