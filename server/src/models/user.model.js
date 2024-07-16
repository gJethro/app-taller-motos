import { Sequelize, DataTypes, Model } from 'sequelize'

class User extends Model {}
// Tabla 'usuarios'
User.init(
  {},
  {
    sequelize,
    modelName: 'usuario',
    tableName: 'usuarios',
    timestamps: false,
  }
)
