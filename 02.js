const { program } = require("@caporal/core")
const { sequelize, Todo } = require('./sequelizeModel.js');


const todoAdd = async(todo) => {
    const t = await sequelize.transaction();
    try {

        const result = await sequelize.transaction(async(t) => {
            const list = await Todo.create({
                activity: todo
            }, { transaction: t });
            return list;

        });

        await t.commit().then((val) => {
            console.log('Berhasil tambah data')
        });

    } catch (error) {

        await t.rollback();
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