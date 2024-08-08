import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'
import DocType from './doc-types.model'
import Gender from './genders.model'
import Role from './roles.model'
import State from './states.model'
import City from './cities.model'
import bcrypt from 'bcrypt'

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err)

      bcrypt.hash(password, salt, null, (err, hash) => {
        if (err) return reject(err)

        return resolve(hash)
      })
    })
  })
}

class User extends Model {}
// Tabla 'usuarios'
User.init(
  {
    docType: {
      field: 'tipos_docs_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DocType,
        key: 'id',
      },
    },
    numDoc: {
      field: 'num_doc',
      primaryKey: true,
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: {
        msg: 'Este número de documento ya está en uso',
      },
    },
    name: {
      field: 'nombre',
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    lastName: {
      field: 'apellidos',
      type: DataTypes.STRING(75),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: {
        msg: 'Esta dirección de correo electrónico ya está en uso.',
      },
      validate: {
        isEmail: {
          msg: 'No se proporcionó una dirección de correo electrónico válida',
        },
      },
    },
    password: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        len: {
          args: [8, 25],
          msg: 'La contraseña debe de tener entre 8 a 25 caracteres.',
        },
      },
    },
    gender: {
      field: 'genero_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Gender,
        key: 'id',
      },
    },
    role: {
      field: 'roles_id',
      defaultValue: 0,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: 'id',
      },
    },
    state: {
      field: 'dptos_dane_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: State,
        key: 'dane_id',
      },
    },
    city: {
      field: 'municipios_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: City,
        key: 'id',
      },
    },
    isActive: {
      field: 'estado',
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    createdAt: {
      field: 'creado',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      field: 'actualizado',
      type: DataTypes.DATE,
      onUpdate: DataTypes.NOW,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'creado',
    updatedAt: 'actualizado',
    hooks: {
      beforeCreate: (user) =>
        hashPassword(user.password)
          .then((success) => {
            user.password = success
          })
          .catch((err) => {
            if (err) console.log(err)
          }),
      beforeValidate: (user) => {
        if (typeof user.email === 'string')
          user.email = user.email.toLowerCase()
      },
    },
  }
)

export default User
