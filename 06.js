const { program } = require("@caporal/core")
const { sequelize, Todo } = require('./sequelizeModel.js');

const todoDoneUndone = async(todoId, status) => {
    const t = await sequelize.transaction();
    try {
        const todos = await Todo.findByPk(todoId);
        if (todos === null) {
            console.log('Todo Not found!');
        } else {

            if (status.toLowerCase() === 'done')
                status = true
            else
                status = false

            const result = await sequelize.transaction(async(t) => {

                await Todo.update({ status: status }, {
                    where: {
                        id: todoId
                    }
                }, { transaction: t });
            });

            await t.commit().then((val) => {
                console.log(`Todo change to ${status}`)
            });
        }

    } catch (error) {

        await t.rollback();
        console.log('Kesalahan, data gagal di update')

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