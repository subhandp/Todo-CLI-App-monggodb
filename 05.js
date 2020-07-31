const { program } = require("@caporal/core")
const { Todos } = require('./todosSchema.js')

const todoTruncate = () => {

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readline.question('Are you sure want to delete? [y/N]', (ans) => {
        if (ans.toLowerCase() == 'y') {
            try {
                Todos.deleteMany({}, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('<Berhasil hapus semua data>')
                    }
                });

            } catch (err) {
                console.log('Kesalahan, Todos gagal dibersihkan')
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