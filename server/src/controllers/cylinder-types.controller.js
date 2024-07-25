import CylinderType from '../models/cylinder-type.model'

export const getCylinderTypes = async (_req, res) => {
  try {
    const cylinderTypes = await CylinderType.findAll()
    if (!cylinderTypes || cylinderTypes.length === 0)
      return res
        .status(404)
        .json({ message: `No se encontraron tipos de cilindraje.` })

    return res.status(200).json({
      message: `Tipos de cilindraje encontrados: ${cylinderTypes.length}`,
      cylinderTypes,
    })
  } catch (error) {
    res.status(400).json({
      message: `No se pudieron encontrar los tipos de cilindraje: ${error.message}`,
    })
  }
}

export const getCylinderType = async (req, res) => {
  try {
    const id = req.params.id
    const cylinderType = await CylinderType.findByPk(id)
    if (!cylinderType)
      return res.status(404).json({
        message: `No se encontró un tipo de cilindraje por el ID ${id}`,
      })
    return res.status(200).json({ cylinderType })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: `No se pudo encontrar el tipo de cilindraje: ${error.message}`,
    })
  }
}

export const createCylinderType = async (req, res) => {
  try {
    const { id, name, cylinderCap } = req.body
    const createdCylinderType = await CylinderType.create({
      id,
      name,
      cylinderCap,
    })
    res.status(201).json({
      message: `Se ha creado el tipo de cilindraje ${createdCylinderType.name}`,
      createdCylinderType,
    })
  } catch (error) {
    res.status(400).json({
      message: `No se pudo crear el tipo de cilindraje: ${error.message}`,
    })
  }
}

export const updateCylinderType = async (req, res) => {
  try {
    const cylinderTypeId = req.params.id
    const cylinderTypeUpdates = req.body
    const oldCylinderType = await CylinderType.findByPk(cylinderTypeId)

    if (!oldCylinderType)
      return res.status(404).json({
        message: `No se encontró un tipo de cilindraje con el ID ${cylinderTypeId}`,
      })

    const hasChanges =
      oldCylinderType.name !== cylinderTypeUpdates.name ||
      oldCylinderType.cylinderCap !== cylinderTypeUpdates.cylinderCap

    if (!hasChanges)
      return res.status(406).json({
        message: `El tipo de cilindraje ${cylinderTypeId} no ha cambiado.`,
      })

    const [affectedRows] = await CylinderType.update(
      {
        name: cylinderTypeUpdates.name,
        cylinderCap: cylinderTypeUpdates.cylinderCap,
      },
      { where: { id: cylinderTypeId } }
    )

    if (affectedRows === 0)
      return res.status(404).json({
        message: `No se encontró un tipo de cilindraje con el ID ${cylinderTypeId}`,
      })

    const updatedCylinderType = await CylinderType.findByPk(cylinderTypeId)

    res.status(200).json({
      message: `Se actualizó el tipo de cilindraje ${cylinderTypeId} exitosamente`,
      updatedCylinderType,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: `No se pudo actualizar el tipo de cilindraje: ${error.message}`,
    })
  }
}

export const deleteCylinderType = async (req, res) => {
  try {
    const cylinderTypeId = req.params.id
    if (!cylinderTypeId)
      return res.status(204).json({
        message: `No se encontró un tipo de cilindraje con el ID ${cylinderTypeId}`,
      })

    const deletedCount = await CylinderType.destroy({
      where: { id: cylinderTypeId },
    })

    if (deletedCount === 0)
      return res.status(404).json({
        message: `No se encontró un tipo de cilindraje con el ID ${cylinderTypeId}`,
      })

    res.status(200).json({
      message: `Se eliminó el tipo de cilindraje ${cylinderTypeId} exitosamente`,
    })
  } catch (error) {
    console.log(error.message)
    res.status(400).json({
      message: `No se pudo eliminar el tipo de cilindraje: ${error.message}`,
    })
  }
}
