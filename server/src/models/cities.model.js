import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'
import State from './states.model'

class City extends Model {}
// Tabla 'municipios'
City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
    },
    city: {
      field: 'municipio',
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    isActive: {
      field: 'estado',
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    statesDaneID: {
      field: 'dptos_dane_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: State,
        key: 'dane_id',
      },
    },
  },
  {
    sequelize,
    modelName: 'City',
    tableName: 'municipios',
    timestamps: false,
  }
)

export default City
