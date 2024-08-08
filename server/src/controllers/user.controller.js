import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.model'

export const getUsers = async (_req, res) => {
  try {
    const users = await User.findAll()
    if (!users || users.length === 0)
      res.status(400).json({ message: 'No hay usuarios registrados' })

    res.status(200).json({ users })
  } catch (error) {
    console.log({ errorName: error.name, error: error.message })
    res.send({ errorName: error.name, error: error.message })
  }
}

export const getUser = async (req, res) => {
  try {
    const num_doc = req.params.numDoc
    const user = User.findOne({ where: { numDoc: num_doc } })
    if (!user || user.length === 0)
      res
        .status(400)
        .json({ message: `No existe un usuario identificado con ${num_doc}` })

    res.status(200).json({ user })
  } catch (error) {
    console.log({ errorName: error.name, error: error.message })
    res.status(400).json({ errorName: error.name, error: error.message })
  }
}

export const register = async (req, res) => {
  try {
    const {
      docType,
      numDoc,
      name,
      lastName,
      email,
      password,
      gender,
      role,
      state,
      city,
    } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      docType,
      numDoc,
      name,
      lastName,
      email,
      password: hashedPassword,
      gender,
      role,
      state,
      city,
    })

    const token = generateToken(user)
    const response = JSON.stringify(
      {
        message: 'Usuario registrado exitosamente',
        token,
      },
      null,
      2
    )

    res.status(201).send(response)
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo registrar el usuario: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid)
      return res.status(401).json({ message: 'Contraseña incorrecta' })

    const token = generateToken(user)
    const response = JSON.stringify(
      {
        message: 'Inicio de sesión exitoso',
        token,
      },
      null,
      2
    )

    res.status(200).send(response)
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo iniciar sesión: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const logout = (_req, res) => {
  try {
    res.cookie('token', '', { expires: new Date(0) })
    return res.status(200).json({ message: 'Sesión cerrada.' })
  } catch (error) {
    console.log(`Error al cerrar sesión: ${error}`)
    res.status(500).json({ message: error.message })
  }
}

export const verifyToken = async (req, res) => {
  const { token } = req.headers
  console.log(req.headers.token)
  console.log(JWT_SECRET)
  if (!token) return res.status(401).json({ message: 'No Autorizado' })
  jwt.verify(token, JWT_SECRET, async (err, user) => {
    console.log(err)
    if (err) return res.status(401).json({ message: 'No Autorizado' })
    console.log({ user })
    const UserFound = await Usuario.findOne({ where: { num_doc: user.numDoc } })
    if (!UserFound) return res.status(401).json({ message: 'No Autorizado' })

    res.status(200).send(
      JSON.stringify(
        {
          numDoc: UserFound.num_doc,
          name: `${UserFound.nombre} ${UserFound.apellido}`,
          email: UserFound.email,
          birthdate: UserFound.fecha_de_nacimiento,
        },
        null,
        2
      )
    )
  })
}

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user
    const { name, lastName, email, gender, state, city } = req.body

    const user = await User.findByPk(id)
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    user.name = name || user.name
    user.lastName = lastName || user.lastName
    user.email = email || user.email
    user.gender = gender || user.gender
    user.state = state || user.state
    user.city = city || user.city

    await user.save()

    const response = JSON.stringify(
      {
        message: 'Perfil actualizado exitosamente',
        user,
      },
      null,
      2
    )

    res.status(200).send(response)
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo actualizar el perfil: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.user

    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    user.isActive = 0
    await user.save()

    const response = JSON.stringify(
      {
        message: 'Perfil desactivado exitosamente',
      },
      null,
      2
    )

    res.status(200).send(response)
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo desactivar el perfil: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}
