import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'

class DocType extends Model {}
// Tabla 'tipos_docs'
DocType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    docName: {
      field: 'documento',
      type: DataTypes.STRING,
      allowNull: false,
    },
    abbreviation: {
      field: 'abreviatura',
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'DocType',
    tableName: 'tipos_docs',
    timestamps: false,
  }
)

export default DocType
