
const UserCollection = require('../Model/userModel')


// User Registration Page
const registerUser = (req, res) => {
    if(req.session.user){
        res.redirect('/home')
    }
    else{
        res.render('usersignup')
    }
}


// Sign up operation
const userSignup = async (req, res) => {
    let user1
    try {

        user1 = new UserCollection({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const email = req.body.email
       
        const userCheck = await UserCollection.findOne({ email: email })
        if (email == userCheck.email) {
            res.render('usersignup', { regerstrationMessage: "Email Already exists" })
        }else{
        
        }
    } catch (error) {
        res.render('usersignup', { regerstrationMessage: "Registration Successfull please login" })
        const userdata = user1.save()
        console.log(error)
    }
    
}


// User Validation

const userVerfication = async (req, res) => {
    try {

      const email = req.body.email
   //   req.session.checkUser=req.body.email
        const password = req.body.password

        let userExists = await UserCollection.findOne({ email: email })
       
        if (userExists) {       
            if (email === userExists.email && password === userExists.password) {
                req.session.user= userExists;
                console.log(' User session created')
                res.redirect('/home')
            }
            else{
                res.render('userlogin',{wrong:'Invalid email or password'})
            }
        }
        else{
            res.render('userlogin',{wrong:'User not found'})
        }
    } catch (error) {
        console.log(error)
    }
}
const userLogin = async(req, res) => {
   
    // let userFound = await UserCollection.findOne({ email: req.session.checkUser })
    // console.log(userFound)
    if(req.session.user){
        res.redirect('/home')
    }
    else{
        res.render('userlogin')
    }
}

const userHome = (req, res) => {

    
    if(req.session.user){
    res.render('userhome', { userExists:req.session.user })
    }
    else{
        res.redirect('/')
    }
}

const userLogout=(req,res)=>{
    req.session.user=false
    console.log(' user session ends')
    res.redirect('/');
}
module.exports = {
    userLogin,
    userSignup,
    userHome,
    registerUser,
    userVerfication,
    userLogout
}

