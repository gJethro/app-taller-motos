import Shop from '../models/shop.model'

export const getShops = async (_req, res) => {
  try {
    const shops = await Shop.findAll()
    if (!shops || shops.length === 0)
      return res.status(404).json({ message: `No se encontraron talleres.` })

    const response = JSON.stringify(
      {
        message: `Talleres encontrados: ${shops.length}`,
        shops,
      },
      null,
      2
    )

    res.status(200).send(response)
  } catch (error) {
    const errorResponse = JSON.stringify(
      {
        message: `No se pudieron encontrar los talleres: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const getShop = async (req, res) => {
  try {
    const id = req.params.id
    const shop = await Shop.findByPk(id)
    if (!shop)
      return res.status(404).json({
        message: `No se encontró un taller por el ID ${id}`,
      })
    return res.status(200).json({ shop })
  } catch (error) {
    console.log(error)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo encontrar el taller: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const createShop = async (req, res) => {
  try {
    const { id, name, branchID } = req.body
    const createdShop = await Shop.create({
      id,
      name,
      branchID,
    })
    const response = JSON.stringify(
      {
        message: `Se ha creado el taller ${createdShop.name}`,
        createdShop,
      },
      null,
      2
    )

    res.status(201).send(response)
  } catch (error) {
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo crear el taller: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const updateShop = async (req, res) => {
  try {
    const shopId = req.params.id
    const shopUpdates = req.body
    const oldShop = await Shop.findByPk(shopId)

    if (!oldShop)
      return res
        .status(404)
        .json({ message: `No se encontró un taller con el ID ${shopId}` })

    const hasChanges =
      oldShop.name !== shopUpdates.name ||
      oldShop.branchID !== shopUpdates.branchID

    if (!hasChanges)
      return res
        .status(406)
        .json({ message: `El taller ${shopId} no ha cambiado.` })

    const [affectedRows] = await Shop.update(
      {
        name: shopUpdates.name,
        branchID: shopUpdates.branchID,
      },
      { where: { id: shopId } }
    )

    if (affectedRows === 0)
      return res
        .status(404)
        .json({ message: `No se encontró un taller con el ID ${shopId}` })

    const updatedShop = await Shop.findByPk(shopId)

    const response = JSON.stringify(
      {
        message: `Se actualizó el taller ${shopId} exitosamente`,
        updatedShop,
      },
      null,
      2
    )

    res.status(200).send(response)
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo actualizar el taller: ${error.message}`,
      },
      null,
      2
    )

    res.status(500).send(errorResponse)
  }
}

export const deleteShop = async (req, res) => {
  try {
    const shopId = req.params.id
    if (!shopId)
      return res
        .status(204)
        .json({ message: `No se encontró un taller con el ID ${shopId}` })

    const deletedCount = await Shop.destroy({ where: { id: shopId } })

    if (deletedCount === 0)
      return res
        .status(404)
        .json({ message: `No se encontró un taller con el ID ${shopId}` })

    res
      .status(200)
      .json({ message: `Se eliminó el taller ${shopId} exitosamente` })
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo eliminar el taller: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}
