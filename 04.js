const { program } = require("@caporal/core")
const { Todos } = require('./todosSchema.js')
const { todoList } = require('./01.js')

const todoDelete = async(todoId) => {
    try {
        await Todos.deleteOne({ _id: todoId });
        console.log('<Berhasil hapus data>')
        todoList()
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