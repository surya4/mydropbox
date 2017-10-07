var mongoose = require('mongoose');
var config = require('../../config/config.js');

mongoose.Promise = Promise;
mongoose.connect(config.dbmmongo.database);

var Schema = mongoose.Schema;
mongoose.set('debug', true);

var fileSchema = new Schema({
    longurl: {
        type: String,
        unique: true,
        required: true
    },
    shorturl: {
        type: String,
        unique: true,
        required: true
    }
}, { collection: 'mydropbox' }, { versionKey: false });

var Data = mongoose.model('Data', fileSchema)

module.exports = Data;