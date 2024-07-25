const rootPath = '/cylinder-types'
import express, { Router } from 'express'
import {
  getCylinderTypes,
  getCylinderType,
  createCylinderType,
  updateCylinderType,
  deleteCylinderType,
} from '../controllers/cylinder-types.controller'

const router = Router()

router.use(express.json())

router.get(rootPath, getCylinderTypes)
router.get(`${rootPath}/:id`, getCylinderType)
router.post(`${rootPath}/create/:id`, createCylinderType)
router.put(`${rootPath}/edit/:id`, updateCylinderType)
router.delete(`${rootPath}/delete/:id`, deleteCylinderType)

export default router
