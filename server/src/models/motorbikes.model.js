import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'
import User from './user.model'
import CylinderType from './cylinder-types.model'
import EngineType from './engine-types'

class Motorbike extends Model {}
// Tabla 'motos'
Motorbike.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    userNumDoc: {
      field: 'usuarios_num_doc',
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: User,
        key: 'num_doc',
      },
    },
    seriesNo: {
      field: 'num_serie',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    brand: {
      field: 'marca',
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    model: {
      field: 'modelo',
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    badgeNo: {
      field: 'num_placa',
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cylinderType: {
      field: 'tipos_cilindrajes_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CylinderType,
        key: 'id',
      },
    },
    cubicCm: {
      field: 'cm_cubicos',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    colors: {
      field: 'colores',
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    engineType: {
      field: 'tipos_motores_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EngineType,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Motorbike',
    tableName: 'motos',
    timestamps: false,
  }
)

export default Motorbike
