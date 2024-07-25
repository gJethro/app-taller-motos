import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'

class Country extends Model {}
// Tabla 'paises'
Country.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    iso: {
      type: DataTypes.CHAR(2),
      allowNull: false,
    },
    name: {
      field: 'nombre',
      type: DataTypes.STRING(80),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Country',
    tableName: 'paises',
    timestamps: false,
  }
)

export default Country
