import ShopBranch from '../models/shop-branch.model'

export const getShopBranches = async (_req, res) => {
  try {
    const shopBranches = await ShopBranch.findAll()
    if (!shopBranches || shopBranches.length === 0)
      return res.status(404).json({ message: `No se encontraron sucursales.` })

    const response = JSON.stringify(
      {
        message: `Sucursales encontradas: ${shopBranches.length}`,
        shopBranches,
      },
      null,
      2
    )

    res.status(200).send(response)
  } catch (error) {
    const errorResponse = JSON.stringify(
      {
        message: `No se pudieron encontrar las sucursales: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const getShopBranch = async (req, res) => {
  try {
    const id = req.params.id
    const shopBranch = await ShopBranch.findByPk(id)
    if (!shopBranch)
      return res.status(404).json({
        message: `No se encontró una sucursal por el ID ${id}`,
      })
    return res.status(200).json({ shopBranch })
  } catch (error) {
    console.log(error)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo encontrar la sucursal: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const createShopBranch = async (req, res) => {
  try {
    const { id, name, phoneNumber, address, cityID } = req.body
    const createdShopBranch = await ShopBranch.create({
      id,
      name,
      phoneNumber,
      address,
      cityID,
    })
    const response = JSON.stringify(
      {
        message: `Se ha creado la sucursal ${createdShopBranch.name}`,
        createdShopBranch,
      },
      null,
      2
    )

    res.status(201).send(response)
  } catch (error) {
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo crear la sucursal: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}

export const updateShopBranch = async (req, res) => {
  try {
    const shopBranchId = req.params.id
    const shopBranchUpdates = req.body
    const oldShopBranch = await ShopBranch.findByPk(shopBranchId)

    if (!oldShopBranch)
      return res
        .status(404)
        .json({
          message: `No se encontró una sucursal con el ID ${shopBranchId}`,
        })

    const hasChanges =
      oldShopBranch.name !== shopBranchUpdates.name ||
      oldShopBranch.phoneNumber !== shopBranchUpdates.phoneNumber ||
      oldShopBranch.address !== shopBranchUpdates.address ||
      oldShopBranch.cityID !== shopBranchUpdates.cityID

    if (!hasChanges)
      return res
        .status(406)
        .json({ message: `La sucursal ${shopBranchId} no ha cambiado.` })

    const [affectedRows] = await ShopBranch.update(
      {
        name: shopBranchUpdates.name,
        phoneNumber: shopBranchUpdates.phoneNumber,
        address: shopBranchUpdates.address,
        cityID: shopBranchUpdates.cityID,
      },
      { where: { id: shopBranchId } }
    )

    if (affectedRows === 0)
      return res
        .status(404)
        .json({
          message: `No se encontró una sucursal con el ID ${shopBranchId}`,
        })

    const updatedShopBranch = await ShopBranch.findByPk(shopBranchId)

    const response = JSON.stringify(
      {
        message: `Se actualizó la sucursal ${shopBranchId} exitosamente`,
        updatedShopBranch,
      },
      null,
      2
    )

    res.status(200).send(response)
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo actualizar la sucursal: ${error.message}`,
      },
      null,
      2
    )

    res.status(500).send(errorResponse)
  }
}

export const deleteShopBranch = async (req, res) => {
  try {
    const shopBranchId = req.params.id
    if (!shopBranchId)
      return res
        .status(204)
        .json({
          message: `No se encontró una sucursal con el ID ${shopBranchId}`,
        })

    const deletedCount = await ShopBranch.destroy({
      where: { id: shopBranchId },
    })

    if (deletedCount === 0)
      return res
        .status(404)
        .json({
          message: `No se encontró una sucursal con el ID ${shopBranchId}`,
        })

    res
      .status(200)
      .json({ message: `Se eliminó la sucursal ${shopBranchId} exitosamente` })
  } catch (error) {
    console.log(error.message)
    const errorResponse = JSON.stringify(
      {
        message: `No se pudo eliminar la sucursal: ${error.message}`,
      },
      null,
      2
    )

    res.status(400).send(errorResponse)
  }
}
