const { Todos } = require('./todosSchema.js')
const { program } = require("@caporal/core")

const todoList = () => {

    Todos.find({})
        .then((data) => {
            if (data.length > 0) {
                data.map((v, i) => {
                    const activity = v.status == 1 ? v.activity + ' (DONE)' : v.activity;
                    console.log(`${v._id} ${activity}`);
                })
            } else {
                console.log('<data kosong>')
            }

        })
        .catch((err) => {
            console.log(err);
        });
}

program
    .command("list", "show list Todos")
    .action(({ logger, args, options }) => {
        console.log(todoList());
    })

program.run()
module.exports = { todoList };