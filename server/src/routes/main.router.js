import express from 'express'
const APIRouter = express.Router()
import DocTypesRouter from '../routes/doc-types.router'
import RolesRouter from '../routes/roles.router'
import UserRouter from '../routes/user.router'

APIRouter.use('/api', DocTypesRouter)
APIRouter.use('/api', RolesRouter)
APIRouter.use('/api', UserRouter)

export default APIRouter
