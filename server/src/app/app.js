//@ts-nocheck
import express from 'express'
import morgan from 'morgan'
const app = express()
import APIRouter from '../routes/main.router'

app.use(express.json())
app.use(morgan('dev'))
app.use('/api', APIRouter)

export default app
