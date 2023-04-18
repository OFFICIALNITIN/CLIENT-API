const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({

    name: {
        type: String,
        maxlength: 50,
        required: true
    },
    branch: {
        type: String,
        maxlength: 20,
        required: true
    },
    rollno: {
        type: Number,
        maxlength: 5,
        required: true
    },
    year: {
        type: String,
        maxlength: 20,
        required: true
    },
    address: {
        type: String,
        maxlength: 100,
    },
    phoneno: {
        type: Number,
        maxlength: 10,
        required: true
    },
    email: {
        type: String,
        maxlength: 50,
        required: true

    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 100,
        required: true
    },

    refreshJWT: {
        token: {
            type: String,
            maxlength: 500,
            default: ''
        },

        addedAt: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }


});

module.exports = {
    UserSchema: mongoose.model('User', UserSchema)
}