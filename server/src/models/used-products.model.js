import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'
import Maintenance from './maintenances.model'
import Product from './products.model'

class UsedProduct extends Model {}
// Tabla 'repuestos_utilizados'
UsedProduct.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maintenanceID: {
      field: 'mantenimientos_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Maintenance,
        key: 'id',
      },
    },
    productID: {
      field: 'productos_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        model: 'id',
      },
    },
    units: {
      field: 'cantidad',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    unitPrice: {
      field: 'precio_unit',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      field: 'precio_total',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UsedProduct',
    tableName: 'repuestos_utilizados',
    timestamps: false,
    hooks: {
      beforeCreate: (usedProduct) =>
        (usedProduct.totalPrice = usedProduct.units * usedProduct.unitPrice),
      beforeUpdate: (usedProduct) =>
        (usedProduct.totalPrice = usedProduct.units * usedProduct.unitPrice),
    },
  }
)

export default UsedProduct
