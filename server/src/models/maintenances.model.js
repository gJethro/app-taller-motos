import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'
import Shop from './shops.model'
import Motorbike from './motorbikes.model'
import Appointment from './appointments.model'

class Maintenance extends Model {}
// Tabla 'mantenimientos'
Maintenance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    shopID: {
      field: 'talleres_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Shop,
        key: 'id',
      },
    },
    appointmentID: {
      field: 'citas_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Appointment,
        key: 'id',
      },
    },
    madeAt: {
      field: 'fecha_realizado',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    description: {
      field: 'descripcion',
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cost: {
      field: 'costo',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    warrantyDate: {
      field: 'fecha_garantia',
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Maintenance',
    tableName: 'mantenimientos',
    timestamps: false,
  }
)

export default Maintenance
