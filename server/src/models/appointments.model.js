import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'
import User from './user.model'
import Motorbike from './motorbikes.model'

class Appointment extends Model {}

Appointment.init(
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
    motorBikeID: {
      field: 'motos_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Motorbike,
        key: 'id',
      },
    },
    issuedAt: {
      field: 'fecha_hora',
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      field: 'descripcion',
      type: DataTypes.STRING(500),
    },
  },
  {
    sequelize,
    modelName: 'Appointment',
    tableName: 'citas',
    timestamps: false,
  }
)

export default Appointment
