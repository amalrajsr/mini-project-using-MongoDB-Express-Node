const mongoose = require('mongoose')

// Defines the structure of document student
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//Mongoose model provides an interface to the database for querying,creating,updating,deleting records

const adminCollection= mongoose.model("Admin",adminSchema)


module.exports=adminCollection