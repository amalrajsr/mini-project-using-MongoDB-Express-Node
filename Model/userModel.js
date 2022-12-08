const mongoose = require('mongoose')

// Defines the structure of document student
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    }
})

// Model and collection creation
const UserCollection = mongoose.model("User", userSchema)

module.exports = UserCollection