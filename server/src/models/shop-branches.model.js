import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'
import City from './cities.model'

class ShopBranch extends Model {}
// Tabla 'sucursales'
ShopBranch.init(
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
    phoneNumber: {
      field: 'telefono',
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    address: {
      field: 'direccion',
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cityID: {
      field: 'municipios_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: City,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'ShopBranch',
    tableName: 'sucursales',
    timestamps: false,
  }
)

export default ShopBranch
