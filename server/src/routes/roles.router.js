const rootPath = '/roles'
import express, { Router } from 'express'
import {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} from '../controllers/roles.controller'

const router = Router()

router.use(express.json())

router.get(rootPath, getRoles)
router.get(`${rootPath}/:id`, getRole)
router.post(`${rootPath}/create`, createRole)
router.put(`${rootPath}/edit/:id`, updateRole)
router.delete(`${rootPath}/delete/:id`, deleteRole)

export default router
