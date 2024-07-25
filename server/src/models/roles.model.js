import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'

class Role extends Model {}
// Tabla 'roles'
Role.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false,
      allowNull: false,
      defaultValue: 0,
    },
    role: {
      field: 'rol',
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: 'user',
    },
  },
  {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
  }
)

export default Role
