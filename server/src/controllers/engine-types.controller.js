import EngineType from '../models/engine-type.model'

export const getEngineTypes = async (_req, res) => {
  try {
    const engineTypes = await EngineType.findAll()
    if (!engineTypes || engineTypes.length === 0)
      return res
        .status(404)
        .json({ message: `No se encontraron tipos de motores.` })

    const response = JSON.stringify(
      {
        message: `Tipos de motores encontrados: ${engineTypes.length}`,
        engineTypes,
      },
      null,
      2
    )

    res.status(200).send(response)
  } catch (error) {
    const errorResponse = JSON.stringify(
      {
        message: `No se pudieron encontrar los tipos de motores: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const getEngineType = async (req, res) => {
  try {
    const id = req.params.id
    const engineType = await EngineType.findByPk(id)
    if (!engineType)
      return res.status(404).json({
        message: `No se encontró un tipo de motor por el ID ${id}`,
      })
    return res.status(200).json({ engineType })
  } catch (error) {
    console.log(error)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo encontrar el tipo de motor: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const createEngineType = async (req, res) => {
  try {
    const { id, name } = req.body
    const createdEngineType = await EngineType.create({
      id,
      name,
    })
    const response = JSON.stringify(
      {
        message: `Se ha creado el tipo de motor ${createdEngineType.name}`,
        createdEngineType,
      },
      null,
      2
    )

    res.status(201).send(response)
  } catch (error) {
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo crear el tipo de motor: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const updateEngineType = async (req, res) => {
  try {
    const engineTypeId = req.params.id
    const engineTypeUpdates = req.body
    const oldEngineType = await EngineType.findByPk(engineTypeId)

    if (!oldEngineType)
      return res.status(404).json({
        message: `No se encontró un tipo de motor con el ID ${engineTypeId}`,
      })

    const hasChanges = oldEngineType.name !== engineTypeUpdates.name

    if (!hasChanges)
      return res
        .status(406)
        .json({ message: `El tipo de motor ${engineTypeId} no ha cambiado.` })

    const [affectedRows] = await EngineType.update(
      {
        name: engineTypeUpdates.name,
      },
      { where: { id: engineTypeId } }
    )

    if (affectedRows === 0)
      return res.status(404).json({
        message: `No se encontró un tipo de motor con el ID ${engineTypeId}`,
      })

    const updatedEngineType = await EngineType.findByPk(engineTypeId)

    const response = JSON.stringify(
      {
        message: `Se actualizó el tipo de motor ${engineTypeId} exitosamente`,
        updatedEngineType,
      },
      null,
      2
    )

    res.status(200).send(response)
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo actualizar el tipo de motor: ${error.message}`,
      },
      null,
      2
    )

    res.status(500).send(errorResponse)
  }
}

export const deleteEngineType = async (req, res) => {
  try {
    const engineTypeId = req.params.id
    if (!engineTypeId)
      return res.status(204).json({
        message: `No se encontró un tipo de motor con el ID ${engineTypeId}`,
      })

    const deletedCount = await EngineType.destroy({
      where: { id: engineTypeId },
    })

    if (deletedCount === 0)
      return res.status(404).json({
        message: `No se encontró un tipo de motor con el ID ${engineTypeId}`,
      })

    res.status(200).json({
      message: `Se eliminó el tipo de motor ${engineTypeId} exitosamente`,
    })
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo eliminar el tipo de motor: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}
