const { program } = require("@caporal/core")
const { sequelize, Todo } = require('./sequelizeModel.js');

const todoUpdate = async(todo, todoId) => {

    const t = await sequelize.transaction();
    try {
        const result = await sequelize.transaction(async(t) => {

            await Todo.update({ activity: todo }, {
                where: {
                    id: todoId
                }
            }, { transaction: t });

        });
        await t.commit().then((val) => {
            console.log("Data berhasil di update")
        });
    } catch (error) {
        await t.rollback();
        console.log('Kesalahan, data gagal di update')
    }

};

program

    .command("update", "Update todo data")
    .argument("<todoId>", "Todo ID")
    .argument("<text>", "New activity")

.action(({ logger, args, options }) => {
    todoUpdate(args.text, args.todoId)
})


program.run()