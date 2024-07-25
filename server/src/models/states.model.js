import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'

class State extends Model {}
// Tabla 'dptos'
State.init(
  {
    daneID: {
      field: 'dane_id',
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false,
      allowNull: false,
    },
    state: {
      field: 'departamento',
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'State',
    tableName: 'dptos',
    timestamps: false,
  }
)

export default State
