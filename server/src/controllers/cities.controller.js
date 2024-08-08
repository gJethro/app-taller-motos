import City from '../models/city.model'

export const getCities = async (_req, res) => {
  try {
    const cities = await City.findAll()
    if (!cities || cities.length === 0)
      return res.status(404).json({ message: `No se encontraron municipios.` })

    const response = JSON.stringify(
      {
        message: `Municipios encontrados: ${cities.length}`,
        cities,
      },
      null,
      2
    )

    res.status(200).send(response)
  } catch (error) {
    const errorResponse = JSON.stringify(
      {
        message: `No se pudieron encontrar los municipios: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const getCity = async (req, res) => {
  try {
    const id = req.params.id
    const city = await City.findByPk(id)
    if (!city)
      return res.status(404).json({
        message: `No se encontró un municipio por el ID ${id}`,
      })
    return res.status(200).json({ city })
  } catch (error) {
    console.log(error)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo encontrar el municipio: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const createCity = async (req, res) => {
  try {
    const { id, city, isActive, statesDaneID } = req.body
    const createdCity = await City.create({
      id,
      city,
      isActive,
      statesDaneID,
    })
    const response = JSON.stringify(
      {
        message: `Se ha creado el municipio ${createdCity.city}`,
        createdCity,
      },
      null,
      2
    )

    res.status(201).send(response)
  } catch (error) {
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo crear el municipio: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const updateCity = async (req, res) => {
  try {
    const cityId = req.params.id
    const cityUpdates = req.body
    const oldCity = await City.findByPk(cityId)

    if (!oldCity)
      return res
        .status(404)
        .json({ message: `No se encontró un municipio con el ID ${cityId}` })

    const hasChanges =
      oldCity.city !== cityUpdates.city ||
      oldCity.isActive !== cityUpdates.isActive ||
      oldCity.statesDaneID !== cityUpdates.statesDaneID

    if (!hasChanges)
      return res
        .status(406)
        .json({ message: `El municipio ${cityId} no ha cambiado.` })

    const [affectedRows] = await City.update(
      {
        city: cityUpdates.city,
        isActive: cityUpdates.isActive,
        statesDaneID: cityUpdates.statesDaneID,
      },
      { where: { id: cityId } }
    )

    if (affectedRows === 0)
      return res
        .status(404)
        .json({ message: `No se encontró un municipio con el ID ${cityId}` })

    const updatedCity = await City.findByPk(cityId)

    const response = JSON.stringify(
      {
        message: `Se actualizó el municipio ${cityId} exitosamente`,
        updatedCity,
      },
      null,
      2
    )

    res.status(200).send(response)
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo actualizar el municipio: ${error.message}`,
      },
      null,
      2
    )

    res.status(500).send(errorResponse)
  }
}

export const deleteCity = async (req, res) => {
  try {
    const cityId = req.params.id
    if (!cityId)
      return res
        .status(204)
        .json({ message: `No se encontró un municipio con el ID ${cityId}` })

    const deletedCount = await City.destroy({ where: { id: cityId } })

    if (deletedCount === 0)
      return res
        .status(404)
        .json({ message: `No se encontró un municipio con el ID ${cityId}` })

    res
      .status(200)
      .json({ message: `Se eliminó el municipio ${cityId} exitosamente` })
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo eliminar el municipio: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}
