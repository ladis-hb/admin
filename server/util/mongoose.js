const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/HuanKon', {
    useNewUrlParser: true,
    useCreateIndex: true,
    keepAlive: 120
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    password:{
        type:String,
        required:true,
        index:true,
    },
});

//Export the model
module.exports = mongoose.model('User', userSchema);
