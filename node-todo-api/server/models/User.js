const  mongoose  = require("mongoose");

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        type: String,
        minlength: 1,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('User', UserSchema)