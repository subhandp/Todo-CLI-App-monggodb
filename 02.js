const { program } = require("@caporal/core")
const { Todos } = require('./todosSchema.js')
const { todoList } = require('./01.js')


const todoAdd = async(todo) => {
    const todoObj = new Todos({ activity: todo });
    try {
        await todoObj.save().then((v) => {
            console.log('<Berhasil tambah data>')
            todoList();
        });
    } catch (err) {
        console.log(err)
        console.log('Kesalahan, data gagal ditambahkan')
    }
}

program
    .command("add", "add todo to the list")
    .argument("<text>", "Todo text activity")
    .action(({ logger, args, options }) => {
        todoAdd(args.text)
    })

program.run()