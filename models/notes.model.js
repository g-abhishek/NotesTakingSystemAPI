var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
    noteTitle : {
        type: String, 
        default: 'untitled'
    },
    noteTxt : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Notes', noteSchema);