const { program } = require("@caporal/core")
const { sequelize, Todo } = require('./sequelizeModel.js');

program

    .command("update", "Update todo data")
    .argument("<todoId>", "Todo ID")
    .argument("<text>", "New activity")

.action(({ logger, args, options }) => {
    todoUpdate(args.text, args.todoId)
})


program.run()