import Role from '../models/roles.model'

export const getRoles = async (_req, res) => {
  try {
    const roles = await Role.findAll()
    if (!roles || roles.length === 0)
      return res.status(404).json({ message: `No se encontraron roles.` })

    return res.status(200).json({
      message: `Roles encontrados: ${roles.length}`,
      roles,
    })
  } catch (error) {
    res
      .status(400)
      .json({ message: `No se pudieron encontrar los roles: ${error.message}` })
  }
}

export const getRole = async (req, res) => {
  try {
    const id = req.params.id
    const role = await Role.findByPk(id)
    if (!role)
      return res.status(404).json({
        message: `No se encontró un rol por el ID ${id}`,
      })
    return res.status(200).json({ role })
  } catch (error) {
    console.log(error)
    res
      .status(400)
      .json({ message: `No se pudo encontrar el rol: ${error.message}` })
  }
}

export const createRole = async (req, res) => {
  try {
    const { id, role } = req.body
    const createdRole = await Role.create({
      id,
      role,
    })
    res.status(201).json({
      message: `Se ha creado el rol ${createdRole.role}`,
      createdRole,
    })
  } catch (error) {
    res.status(400).json({
      message: `No se pudo crear el rol: ${error.message}`,
    })
  }
}

export const updateRole = async (req, res) => {
  try {
    const roleId = req.params.id
    const roleUpdates = req.body
    const oldRole = await Role.findByPk(roleId)

    if (!oldRole)
      return res
        .status(404)
        .json({ message: `No se encontró un rol con el ID ${roleId}` })

    const hasChanges = oldRole.role !== roleUpdates.role

    if (!hasChanges)
      return res
        .status(406)
        .json({ message: `El rol ${roleId} no ha cambiado.` })

    const [affectedRows] = await Role.update(
      { role: roleUpdates.role },
      { where: { id: roleId } }
    )

    if (affectedRows === 0)
      return res
        .status(404)
        .json({ message: `No se encontró un rol con el ID ${roleId}` })

    const updatedRole = await Role.findByPk(roleId)

    res.status(200).json({
      message: `Se actualizó el rol ${roleId} exitosamente`,
      updatedRole,
    })
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({ message: `No se pudo actualizar el rol: ${error.message}` })
  }
}

export const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id
    if (!roleId)
      return res
        .status(204)
        .json({ message: `No se encontró un rol con el ID ${roleId}` })

    const deletedCount = await Role.destroy({ where: { id: roleId } })

    if (deletedCount === 0)
      return res
        .status(404)
        .json({ message: `No se encontró un rol con el ID ${roleId}` })

    res
      .status(200)
      .json({ message: `Se eliminó el rol ${roleId} exitosamente` })
  } catch (error) {
    console.log(error.message)
    res
      .status(400)
      .json({ message: `No se pudo eliminar el rol: ${error.message}` })
  }
}
