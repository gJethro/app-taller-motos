import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'

class CylinderType extends Model {}
//Tabla 'tipos_cilindrajes'
CylinderType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      field: 'nombre',
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cylinderCap: {
      field: 'capacidad_cilindraje',
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'CylinderType',
    tableName: 'tipos_cilindrajes',
    timestamps: false,
  }
)

export default CylinderType
