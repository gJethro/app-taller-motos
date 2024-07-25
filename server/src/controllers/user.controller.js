import User from '../models/user.model'

export const getUsers = async (_req, res) => {
  try {
    const users = await User.findAll()
    !users || users.length === 0
      ? res.status(400).json({ msg: 'No hay usuarios registrados' })
      : res.status(200).json({ users })
  } catch (error) {
    res.send(error)
  }
}

export const getUser = async (req, res) => {
  try {
    const num_doc = req.params.numDoc
    const user = User.findOne({
      where: {
        numDoc: num_doc,
      },
    })
    !user || user.length === 0
      ? res.status(400).json({
          msg: `No existe un usuario identificado con ${num_doc}`,
        })
      : res.status(200).json({ user })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}
