//@ts-nocheck
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import pkg from '../package.json'
import testConnection from './config/conn.test'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('pkg', pkg)
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({
    projectName: app.get('pkg').name,
    author: app.get('pkg').author,
    version: app.get('pkg').version,
  })
})

testConnection()

export default app
