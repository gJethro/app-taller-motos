import app from './app/app'
import testConnection from './config/conn.test'
const port = 3000

testConnection()

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
