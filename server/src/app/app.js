//@ts-nocheck
import express from 'express'
import morgan from 'morgan'
import pkg from '../../package.json'
import DocTypesRouter from '../routes/doc-types.router'
import RolesRouter from '../routes/roles.router'

const app = express()
app.use(express.json())
app.set('pkg', pkg)
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({
    projectName: app.get('pkg').name,
    author: app.get('pkg').author,
    version: app.get('pkg').version,
  })
})

app.use('/api', DocTypesRouter)
app.use('/api', RolesRouter)

export default app
