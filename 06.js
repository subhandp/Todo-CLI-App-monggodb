const { program } = require("@caporal/core")
const { Todos } = require('./todosSchema.js')
const { todoUpdate } = require('./03.js')


const todoDoneUndone = async(todoId, status) => {
    const todos = await Todos.findById(todoId);
    if (todos === null) {
        console.log('Todo Not found!');
    } else {

        if (status.toLowerCase() === 'done')
            status = 1
        else
            status = 0
        todoUpdate({ status: status }, todoId)
    }

}

program

    .command("done", "set todo done")
    .argument("<todoId>", "Todo ID")
    .action(({ logger, args, options }) => {
        console.log(todoDoneUndone(args.todoId, 'done'));
    })

.command("undone", "set todo undone")
    .argument("<todoId>", "Todo ID")
    .action(({ logger, args, options }) => {
        console.log(todoDoneUndone(args.todoId, 'undone'));
    })

program.run()