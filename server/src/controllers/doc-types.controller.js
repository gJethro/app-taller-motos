import DocType from '../models/doc-types.model'

export const getDocTypes = async (_req, res) => {
  try {
    const docTypes = await DocType.findAll()
    if (!docTypes || docTypes.length === 0)
      return res
        .status(404)
        .send(
          JSON.stringify(
            { message: `No se encontraron tipos de documentos.` },
            null,
            2
          )
        )

    return res.status(200).json({
      message: `Tipos de documentos encontrados: ${docTypes.length}`,
      docTypes,
    })
  } catch (error) {
    res.status(400).json({
      message: `No se pudieron encontrar los tipos de documentos: ${error.message}`,
    })
  }
}

export const getDocType = async (req, res) => {
  try {
    const id = req.params.id
    const docType = await DocType.findByPk(id)
    if (!docType || docType.length === 0)
      return res.status(404).json({
        message: `No se encontró un tipo de documento por el ID ${id}`,
      })
    return res.status(200).json({ docType })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: `No se pudo encontrar el tipo de documento: ${error.message}`,
    })
  }
}

export const createDocType = async (req, res) => {
  try {
    const { id, docName, abbreviation } = req.body
    const createdDoc = await DocType.create({
      id,
      docName,
      abbreviation,
    })
    res.status(201).json({
      message: `Se ha creado el tipo de documento ${createdDoc}`,
    })
  } catch (error) {
    res.status(400).json({
      message: `No se pudo crear el tipo de documento: ${error.message}`,
    })
  }
}

export const updateDocType = async (req, res) => {
  try {
    const docId = req.params.id
    const docUpdates = req.body
    const oldDoc = await DocType.findByPk(docId)

    if (!oldDoc)
      return res
        .status(404)
        .json({ message: `No se encontró un documento con el ID ${docId}` })

    const hasChanges =
      oldDoc.docName !== docUpdates.docName ||
      oldDoc.abbreviation !== docUpdates.abbreviation

    if (!hasChanges)
      return res
        .status(406)
        .json({ message: `El documento ${docId} no ha cambiado.` })

    const [affectedRows] = await DocType.update(
      {
        docName: docUpdates.docName,
        abbreviation: docUpdates.abbreviation,
      },
      { where: { id: docId } }
    )

    if (affectedRows === 0)
      return res
        .status(404)
        .json({ message: `No se encontró un documento con el ID ${docId}` })

    const updatedDoc = await DocType.findByPk(docId)

    res.status(200).json({
      message: `Se actualizó el documento ${docId} exitosamente`,
      updatedDoc,
    })
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({ message: `No se pudo actualizar el documento: ${error.message}` })
  }
}

export const deleteDocType = async (req, res) => {
  try {
    const docId = req.params.id
    if (!docId || docId.length === 0)
      return res
        .status(204)
        .json({ message: `No se encontró un documento con el ID ${docId}` })

    await DocType.destroy({ where: { id: docId } })
  } catch (error) {
    console.log(error.message)
    res
      .status(400)
      .json({ message: `No se pudo eliminar el documento: ${error.message}` })
  }
}
