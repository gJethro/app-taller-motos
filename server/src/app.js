//@ts-nocheck
import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'

const app = express()

app.set('pkg', pkg)
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({
    projectName: app.get('pkg').name,
    author: app.get('pkg').author,
    version: app.get('pkg').version,
  })
})

export default app
