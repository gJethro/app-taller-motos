// Relaciones de las tablas
import City from '../cities.model'
import Country from '../countries.model'
import CylinderType from '../cylinder-types.model'
import DocType from '../doc-types.model'
import EngineType from '../engine-types'
import Gender from '../genders.model'
import Motorbike from '../motorbikes.model'
import Role from '../roles.model'
import Product from '../products.model'
import ShopBranch from '../shop-branches.model'
import Shop from '../shops.model'
import State from '../states.model'
import User from '../user.model'
import Maintenance from '../maintenances.model'
import Appointment from '../appointments.model'
import UsedProduct from '../used-products.model'

// Departamentos -> Municipios
State.hasMany(City, { foreignKey: 'dptos_dane_id' })
City.belongsTo(State, { foreignKey: 'dptos_dane_id' })

// Departamentos -> Usuarios
State.hasMany(User, { foreignKey: 'dptos_dane_id' })
User.belongsTo(State, { foreignKey: 'dptos_dane_id' })

// Municipios -> Usuarios
City.hasMany(User, { foreignKey: 'municipios_id' })
User.belongsTo(City, { foreignKey: 'municipios_id' })

// Tipos de Doc. -> Usuarios
DocType.hasMany(User, { foreignKey: 'tipos_docs_id' })
User.belongsTo(DocType, { foreignKey: 'tipos_docs_id' })

// Géneros -> Usuarios
Gender.hasMany(User, { foreignKey: 'genero_id' })
User.belongsTo(Gender, { foreignKey: 'genero_id' })

// Roles -> Usuarios
Role.hasMany(User, { foreignKey: 'roles_id' })
User.belongsTo(Role, { foreignKey: 'roles_id' })

// Países -> Productos
Country.hasMany(Product, { foreignKey: 'pais_origen' })
Product.belongsTo(Country, { foreignKey: 'pais_origen' })

// Sucursales -> Talleres
ShopBranch.hasMany(Shop, { foreignKey: 'sucursales_id' })
Shop.belongsTo(ShopBranch, { foreignKey: 'sucursales_id' })

// Usuarios -> Motos
User.hasMany(Motorbike, { foreignKey: 'usuarios_num_doc' })
Motorbike.belongsTo(User, { foreignKey: 'usuarios_num_doc' })

// Tipos de Cilindraje -> Motos
CylinderType.hasMany(Motorbike, { foreignKey: 'tipos_cilindrajes_id' })
Motorbike.belongsTo(CylinderType, { foreignKey: 'tipos_cilindrajes_id' })

// Tipos de Motores -> Motos
EngineType.hasMany(Motorbike, { foreignKey: 'tipos_motores_id' })
Motorbike.belongsTo(EngineType, { foreignKey: 'tipos_motores_id' })

// Talleres -> Mantenimientos
Shop.hasMany(Maintenance, { foreignKey: 'talleres_id' })
Maintenance.belongsTo(Shop, { foreignKey: 'talleres_id' })

// Motos -> Mantenimientos
Motorbike.hasMany(Maintenance, { foreignKey: 'motos_id' })
Maintenance.belongsTo(Motorbike, { foreignKey: 'motos_id' })

// Usuarios -> Citas
User.hasMany(Appointment, { foreignKey: 'usuarios_num_doc' })
Appointment.belongsTo(User, { foreignKey: 'usuarios_num_doc' })

// Motos -> Citas
Motorbike.hasMany(Appointment, { foreignKey: 'motos_id' })
Appointment.belongsTo(Motorbike, { foreignKey: 'motos_id' })

// Citas -> Mantenimientos
Appointment.hasMany(Maintenance, { foreignKey: 'citas_id' })
Maintenance.belongsTo(Appointment, { foreignKey: 'citas_id' })

// Mantenimientos -> Repuestos Utilizados
Maintenance.hasMany(UsedProduct, { foreignKey: 'mantenimientos_id' })
UsedProduct.belongsTo(Maintenance, { foreignKey: 'mantenimientos_id' })

// Productos -> Repuestos Utilizados
Product.hasMany(UsedProduct, { foreignKey: 'productos_id' })
UsedProduct.belongsTo(Product, { foreignKey: 'productos_id' })
