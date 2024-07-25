import Country from '../models/country.model'

export const getCountries = async (_req, res) => {
  try {
    const countries = await Country.findAll()
    if (!countries || countries.length === 0)
      return res.status(404).json({ message: `No se encontraron países.` })

    const response = JSON.stringify(
      {
        message: `Países encontrados: ${countries.length}`,
        countries,
      },
      null,
      2
    )

    res.status(200).send(response)
  } catch (error) {
    const errorResponse = JSON.stringify(
      {
        message: `No se pudieron encontrar los países: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const getCountry = async (req, res) => {
  try {
    const id = req.params.id
    const country = await Country.findByPk(id)
    if (!country)
      return res.status(404).json({
        message: `No se encontró un país por el ID ${id}`,
      })
    return res.status(200).json({ country })
  } catch (error) {
    console.log(error)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo encontrar el país: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const createCountry = async (req, res) => {
  try {
    const { id, iso, name } = req.body
    const createdCountry = await Country.create({
      id,
      iso,
      name,
    })
    const response = JSON.stringify(
      {
        message: `Se ha creado el país ${createdCountry.name}`,
        createdCountry,
      },
      null,
      2
    )

    res.status(201).send(response)
  } catch (error) {
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo crear el país: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const updateCountry = async (req, res) => {
  try {
    const countryId = req.params.id
    const countryUpdates = req.body
    const oldCountry = await Country.findByPk(countryId)

    if (!oldCountry)
      return res
        .status(404)
        .json({ message: `No se encontró un país con el ID ${countryId}` })

    const hasChanges =
      oldCountry.iso !== countryUpdates.iso ||
      oldCountry.name !== countryUpdates.name

    if (!hasChanges)
      return res
        .status(406)
        .json({ message: `El país ${countryId} no ha cambiado.` })

    const [affectedRows] = await Country.update(
      {
        iso: countryUpdates.iso,
        name: countryUpdates.name,
      },
      { where: { id: countryId } }
    )

    if (affectedRows === 0)
      return res
        .status(404)
        .json({ message: `No se encontró un país con el ID ${countryId}` })

    const updatedCountry = await Country.findByPk(countryId)

    const response = JSON.stringify(
      {
        message: `Se actualizó el país ${countryId} exitosamente`,
        updatedCountry,
      },
      null,
      2
    )

    res.status(200).send(response)
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo actualizar el país: ${error.message}`,
      },
      null,
      2
    )

    res.status(500).send(errorResponse)
  }
}

export const deleteCountry = async (req, res) => {
  try {
    const countryId = req.params.id
    if (!countryId)
      return res
        .status(204)
        .json({ message: `No se encontró un país con el ID ${countryId}` })

    const deletedCount = await Country.destroy({ where: { id: countryId } })

    if (deletedCount === 0)
      return res
        .status(404)
        .json({ message: `No se encontró un país con el ID ${countryId}` })

    res
      .status(200)
      .json({ message: `Se eliminó el país ${countryId} exitosamente` })
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo eliminar el país: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}
