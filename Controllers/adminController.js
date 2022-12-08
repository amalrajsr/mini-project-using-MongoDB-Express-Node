
const UserCollection = require('../Model/userModel')
const AdminCollection=require('../Model/adminModel')
//const config = require('../Config/config')


//Admin Login
const adminLogin = (req, res) => {
    if (req.session.admin) {
        res.redirect('/adminhome')
    }
    else {

        res.render('adminlogin')
    }
}


// Admin validation
const adminVerification = async(req, res) => {
    try {
        email=req.body.email
        let adminExists = await AdminCollection.findOne({ email: email })
        if (req.body.email ==adminExists.email && req.body.password == adminExists.password) {
            req.session.admin = req.body.email
            console.log('Admin session created')
            res.redirect('/adminhome')
        }
        else {
            res.render('adminlogin', { wrong: 'Wrong Username or Password' })
        }

    } catch (error) {
        console.log(error)
    }

}

// Admin HomePage
const adminHome = async (req, res) => {
    if (req.session.admin) {
        try {
            let search = ''
            if (req.query.search) {
                search = req.query.search
            }
            const userData = await UserCollection.find(
                {
                    
                    $or: [
                        { name: { $regex: '^' + search + '.*' ,$options:'i'} },
                        { email: { $regex: '^' + search + '.*',$options:'i' } }
                         ]

                })

            res.render('adminhome', { details: userData })
        }
        catch (error) {
            console.log(error.message)
        }
    }
    else {

        res.redirect('/admin')
    }
}

// Admin add user page
const addUser = (req, res) => {
    if (req.session.admin) {
        res.render('addUserAdmin')
    }
    else {
        res.redirect('/admin')
    }
}

// Admin add user functionality
const addUserFunction = async (req, res) => {
    let user1
    const email = req.body.email
    try {

        user1 = new UserCollection({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        

        const userCheck = await UserCollection.findOne({ email: email })
        if (email === userCheck.email) {
            res.render('addUserAdmin', { regerstrationMessage: "Email Already exists" })
        }
    } catch (error) {
        res.render('addUserAdmin', { regerstrationMessage: "Successfully Added" })
        user1.save()
        console.log(error)
    }
}

// User Edit page
let id
const editUser = async (req, res) => {
    if(req.session.admin){
    try {

        id = req.query.id // to fetch data from url
        const userData = await UserCollection.findById({ _id: id })


        if (userData) {
            res.render('updateUserAdmin', { User: userData })


        } else {
            res.render('/adminhome')
        }

    } catch (error) {
        console.log(error.message)
    }

}
else{
    res.redirect('/admin')
}
}
// User Edit Function

const editUserFunction = async (req, res) => {

    try {

        //console.log(id)
        if (req.session.admin) {

            const updateUser = await UserCollection.findByIdAndUpdate({ _id: id }, { $set: { name: req.body.name, email: req.body.email, password: req.body.password } })
            res.redirect('/adminhome')

        }
        else {
            res.redirect('/admin')
        }
    } catch (error) {

        console.log(error.message)
    }
}
// User Delete
const userDelete = async (req, res) => {
    if (req.session.admin) {
        try {

            let userid = req.query.id
            
             await UserCollection.findByIdAndDelete({ _id: userid })
            res.redirect('/adminhome')
        
        } catch (error) {
            console.log(error.message)
        }
    } else {
        res.redirect('/admin')
    }
}
// Admin Logout
const adminLogout = (req, res) => {
    // req.session.destroy((error)=>{
    //     if(error){
    //         console.log(error.message)
    //     }else{
    //         console.log(' Admin session ends')
    //         res.redirect('/admin');
    //     }
    // })
    req.session.admin=false
    console.log(' Admin session ends')
    res.redirect('/admin');
}
module.exports = {
    adminLogin,
    adminVerification,
    adminHome,
    adminLogout,
    addUser,
    addUserFunction,
    editUser,
    editUserFunction,
    userDelete,
   
}