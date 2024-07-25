import State from '../models/state.model'

export const getStates = async (_req, res) => {
  try {
    const states = await State.findAll()
    if (!states || states.length === 0)
      return res
        .status(404)
        .json({ message: `No se encontraron departamentos.` })

    const response = JSON.stringify(
      {
        message: `Departamentos encontrados: ${states.length}`,
        states,
      },
      null,
      2
    )

    res.status(200).send(response)
  } catch (error) {
    const errorResponse = JSON.stringify(
      {
        message: `No se pudieron encontrar los departamentos: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const getState = async (req, res) => {
  try {
    const daneID = req.params.daneID
    const state = await State.findByPk(daneID)
    if (!state)
      return res.status(404).json({
        message: `No se encontró un departamento por el ID ${daneID}`,
      })
    return res.status(200).json({ state })
  } catch (error) {
    console.log(error)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo encontrar el departamento: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const createState = async (req, res) => {
  try {
    const { daneID, state } = req.body
    const createdState = await State.create({
      daneID,
      state,
    })
    const response = JSON.stringify(
      {
        message: `Se ha creado el departamento ${createdState.state}`,
        createdState,
      },
      null,
      2
    )

    res.status(201).send(response)
  } catch (error) {
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo crear el departamento: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const updateState = async (req, res) => {
  try {
    const daneID = req.params.daneID
    const stateUpdates = req.body
    const oldState = await State.findByPk(daneID)

    if (!oldState)
      return res
        .status(404)
        .json({ message: `No se encontró un departamento con el ID ${daneID}` })

    const hasChanges = oldState.state !== stateUpdates.state

    if (!hasChanges)
      return res
        .status(406)
        .json({ message: `El departamento ${daneID} no ha cambiado.` })

    const [affectedRows] = await State.update(
      { state: stateUpdates.state },
      { where: { daneID } }
    )

    if (affectedRows === 0)
      return res
        .status(404)
        .json({ message: `No se encontró un departamento con el ID ${daneID}` })

    const updatedState = await State.findByPk(daneID)

    const response = JSON.stringify(
      {
        message: `Se actualizó el departamento ${daneID} exitosamente`,
        updatedState,
      },
      null,
      2
    )

    res.status(200).send(response)
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo actualizar el departamento: ${error.message}`,
      },
      null,
      2
    )

    res.status(500).send(errorResponse)
  }
}

export const deleteState = async (req, res) => {
  try {
    const daneID = req.params.daneID
    if (!daneID)
      return res
        .status(204)
        .json({ message: `No se encontró un departamento con el ID ${daneID}` })

    const deletedCount = await State.destroy({ where: { daneID } })

    if (deletedCount === 0)
      return res
        .status(404)
        .json({ message: `No se encontró un departamento con el ID ${daneID}` })

    res
      .status(200)
      .json({ message: `Se eliminó el departamento ${daneID} exitosamente` })
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo eliminar el departamento: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}
