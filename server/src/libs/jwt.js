import jwt from 'jsonwebtoken'
import JWT_SECRET from './token.config'

const createToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }, (err, token) =>
      err ? reject(err) : resolve(token)
    )
  })
}

export default createToken
