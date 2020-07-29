const { program } = require("@caporal/core")
const { sequelize, Todo } = require('./sequelizeModel.js');

const todoDelete = async(todoId) => {
    try {
        await Todo.destroy({
            where: {
                id: todoId
            }
        }).then((val) => {
            console.log('Berhasil hapus data')
        });

    } catch (err) {
        console.log('Kesalahan, data gagal di hapus')
    }
}


program

    .command("del", "Delete todo")
    .argument("<todoId>", "Todo ID")
    .action(({ logger, args, options }) => {
        todoDelete(args.todoId)
    })


program.run()