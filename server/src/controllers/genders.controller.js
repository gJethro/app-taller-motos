import Gender from '../models/gender.model'

export const getGenders = async (_req, res) => {
  try {
    const genders = await Gender.findAll()
    if (!genders || genders.length === 0)
      return res.status(404).json({ message: `No se encontraron géneros.` })

    return res.status(200).json({
      message: `Géneros encontrados: ${genders.length}`,
      genders,
    })
  } catch (error) {
    res.status(400).json({
      message: `No se pudieron encontrar los géneros: ${error.message}`,
    })
  }
}

export const getGender = async (req, res) => {
  try {
    const id = req.params.id
    const gender = await Gender.findByPk(id)
    if (!gender)
      return res.status(404).json({
        message: `No se encontró un género por el ID ${id}`,
      })
    return res.status(200).json({ gender })
  } catch (error) {
    console.log(error)
    res
      .status(400)
      .json({ message: `No se pudo encontrar el género: ${error.message}` })
  }
}

export const createGender = async (req, res) => {
  try {
    const { id, name } = req.body
    const createdGender = await Gender.create({
      id,
      name,
    })
    res.status(201).json({
      message: `Se ha creado el género ${createdGender.name}`,
      createdGender,
    })
  } catch (error) {
    res.status(400).json({
      message: `No se pudo crear el género: ${error.message}`,
    })
  }
}

export const updateGender = async (req, res) => {
  try {
    const genderId = req.params.id
    const genderUpdates = req.body
    const oldGender = await Gender.findByPk(genderId)

    if (!oldGender)
      return res
        .status(404)
        .json({ message: `No se encontró un género con el ID ${genderId}` })

    const hasChanges = oldGender.name !== genderUpdates.name

    if (!hasChanges)
      return res
        .status(406)
        .json({ message: `El género ${genderId} no ha cambiado.` })

    const [affectedRows] = await Gender.update(
      { name: genderUpdates.name },
      { where: { id: genderId } }
    )

    if (affectedRows === 0)
      return res
        .status(404)
        .json({ message: `No se encontró un género con el ID ${genderId}` })

    const updatedGender = await Gender.findByPk(genderId)

    res.status(200).json({
      message: `Se actualizó el género ${genderId} exitosamente`,
      updatedGender,
    })
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({ message: `No se pudo actualizar el género: ${error.message}` })
  }
}

export const deleteGender = async (req, res) => {
  try {
    const genderId = req.params.id
    if (!genderId)
      return res
        .status(204)
        .json({ message: `No se encontró un género con el ID ${genderId}` })

    const deletedCount = await Gender.destroy({ where: { id: genderId } })

    if (deletedCount === 0)
      return res
        .status(404)
        .json({ message: `No se encontró un género con el ID ${genderId}` })

    res
      .status(200)
      .json({ message: `Se eliminó el género ${genderId} exitosamente` })
  } catch (error) {
    console.log(error.message)
    res
      .status(400)
      .json({ message: `No se pudo eliminar el género: ${error.message}` })
  }
}
