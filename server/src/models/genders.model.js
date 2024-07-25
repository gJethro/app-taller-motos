import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'

class Gender extends Model {}
// Tabla 'generos'
Gender.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      field: 'genero',
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Gender',
    tableName: 'generos',
    timestamps: false,
  }
)

export default Gender
