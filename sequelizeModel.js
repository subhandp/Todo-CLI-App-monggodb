const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('todos_sequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});


(async() => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

})();

class Todo extends Model {}

Todo.init({
    activity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'Todo'
});

(async() => {
    await Todo.sync();
})()


module.exports = { Todo, sequelize }