import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'
import ShopBranch from './shop-branches.model'

class Shop extends Model {}
// Tabla 'talleres'
Shop.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      field: 'nombre',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    branchID: {
      field: 'sucursales_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ShopBranch,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Shop',
    tableName: 'talleres',
    timestamps: false,
  }
)

export default Shop
