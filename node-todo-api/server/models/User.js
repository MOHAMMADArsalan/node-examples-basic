const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const _ = require("lodash");


const config = require("./../config/config")
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: "{VALUE} is not a valid email"
        }
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})



/**
 * @name toJSON
 * @description overwriting toJSON methods of  mongoose
 */

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email'])
}

/**
 * @name generateAuthToken
 * @description creating custom generateAuthToken function
 * @returns {Promise}
 */
UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({ _id: user._id, access }, config.JWT_SECRET_TOKEN).toString();

    user.tokens.push({ access, token });

    return user.save().then(() => token).catch((e) => { console.log(e) })

}

UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decode;
    try {
        decode = jwt.verify(token, config.JWT_SECRET_TOKEN);
    } catch (e) {
        return new Promise((resolve, reject) => reject())
    }
    return User.findOne({
        '_id': decode._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })

}


UserSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next()
            })
        })
    } else {
        next();
    }
})
module.exports = mongoose.model('User', UserSchema)