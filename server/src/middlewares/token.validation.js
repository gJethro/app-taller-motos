import JWT_SECRET from '../libs/token.config'
import jwt from 'jsonwebtoken'

const authRequired = (req, res, next) => {
  const { token } = req.cookies

  !token
    ? res
        .status(401)
        .json({ message: 'No se encontró un token. Acceso denegado.' })
    : jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err)
          return res
            .status(401)
            .json({ message: 'Token inválido. Acceso denegado.' })
        req.user = user
        next()
      })
}

export default authRequired
