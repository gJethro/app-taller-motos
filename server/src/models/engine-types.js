import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'

class EngineType extends Model {}
// Tabla 'tipos_motores'
EngineType.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      field: 'nombre',
      type: DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    modelName: 'EngineType',
    tableName: 'tipos_motores',
    timestamps: false,
  }
)

export default EngineType
