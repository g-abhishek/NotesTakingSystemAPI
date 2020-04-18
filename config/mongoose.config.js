var mongoose = require('mongoose');

dbURL = 'mongodb+srv://*******:*******@cluster0-k6g35.mongodb.net/notesdb?retryWrites=true&w=majority';

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log('connected to database');
});
mongoose.connection.on('error', (err)=>{
    console.log('error', err);
})

module.exports.mongoose;

