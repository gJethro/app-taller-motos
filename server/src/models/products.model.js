import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'
import Country from './countries.model'

class Product extends Model {}
// Tabla 'productos'
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    originCountry: {
      field: 'pais_origen',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Country,
        key: 'id',
      },
    },
    name: {
      field: 'nombre',
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    description: {
      field: 'descripcion',
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    unitPrice: {
      field: 'precio_unit',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'productos',
  }
)

export default Product
