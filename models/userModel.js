const sequelize = require('../sequelize');
const dataType = require('sequelize');

const User = sequelize.define('users', {
	id:{
		type: dataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},

	username:{
		type: dataType.STRING(150),
		allowNull: false
	},

	password:{
		type: dataType.STRING(255),
		allowNull: false
	}
	},
	{
		modelName: 'users',
		timestamps: false,
		underscored: true
	});

module.exports = User;