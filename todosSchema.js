const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

const Schema = mongoose.Schema;

const todosSchema = new Schema({
    activity: String,
    status: Number,
    createdDate: {
        type: Date,
        default: Date
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
});
const Todos = mongoose.model('Todos', todosSchema);

module.exports = { Todos };