const mongoose = require('mongoose')


//Creating database and connecting to the database
mongoose.connect("mongodb://127.0.0.1:27017/admindb").then(() => {
  
    console.log('Database running succesfully')

}).catch((err) => {

    console.log(err)

})



