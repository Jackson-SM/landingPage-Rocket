const db = require('./db')

const Usuario = db.sequelize.define('usuarios',{
    login: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.TEXT
    },
    name: {
        type: db.Sequelize.STRING
    },
    password: {
        type: db.Sequelize.STRING
    }
})

module.exports = Usuario