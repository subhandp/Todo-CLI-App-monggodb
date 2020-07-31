const { program } = require("@caporal/core")
const { Todos } = require('./todosSchema.js')
const { todoList } = require('./01.js')

const todoUpdate = async(todo, todoId) => {
    try {
        await Todos.findByIdAndUpdate(todoId, todo).exec();
        console.log("<Data berhasil di update>");
        todoList();
    } catch (err) {
        console.log(err)
        console.log('Kesalahan, data gagal di update');
    }

};

program

    .command("update", "Update todo data")
    .argument("<todoId>", "Todo ID")
    .argument("<text>", "New activity")

.action(({ logger, args, options }) => {
    todoUpdate({ activity: args.text }, args.todoId)
})


program.run()
module.exports = { todoUpdate }