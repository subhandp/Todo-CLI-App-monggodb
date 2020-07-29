const { program } = require("@caporal/core")
const { sequelize, Todo } = require('./sequelizeModel.js');

const todoTruncate = () => {

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readline.question('Are you sure want to delete? [y/N]', (ans) => {
        if (ans.toLowerCase() == 'y') {
            try {

                (async() => {
                    await Todo.destroy({
                        truncate: true
                    }).then((val) => {
                        console.log("Todos berhasil dibersihkan")
                    });
                })()


            } catch (err) {
                console.log('Kesalahan, Todos gagl dibersihkan')
            }
        } else {
            return
        }

        readline.close()
    })

}

program

    .command("clear", "Clear todos list")
    .action(({ logger, args, options }) => {
        console.log(todoTruncate());
    })


program.run()