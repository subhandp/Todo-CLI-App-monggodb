const { program } = require("@caporal/core")
const { sequelize, Todo } = require('./sequelizeModel.js');

const todoList = async() => {
    const todos = await Todo.findAll({
        attributes: ['id', 'activity', 'status']
    });
    if (todos.length > 0) {
        todos.map((v, i) => {
            const activity = v.dataValues.status == true ? v.dataValues.activity + ' (DONE)' : v.dataValues.activity;
            console.log(`${v.dataValues.id}. ${activity}`)
        })
    } else {
        console.log('Todos kosong')
    }
}

program

    .command("list", "show list Todos")
    .action(({ logger, args, options }) => {
        console.log(todoList());
    })

program.run()