const express= require('express');
const { body } = require('express-validator');
const User= require('../models/User');
const router= express.Router();
const {validationResult}= require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlerware/fetchuser');

const JWT_SECRET='Harryisagoodboy';


//Route:1 Create a User using: POST "/api/auth/createuser". Doesnot require Authentication.
router.post('/createuser',[
    body('name', 'Enter a Valid name').isLength({min : 3}),
    body('email','Enter a Valid email').isEmail(),
    body('password','Password must be atleast 5 character').isLength({min : 5}),
    ],async (req, res)=>{

    let  success = false;

        
    // If there are Validation errors,return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    
    try{
        // Check whether the user with this email exists already.
        let user = await User.findOne({email : req.body.email});
        if(user){
            return res.status(400).json({success,error: "User with this email already exists"});
        }

        //Conveting password to hash code
        const salt=await bcrypt.genSalt(10);
        secPass =await bcrypt.hash(req.body.password, salt);

        // Creating a new User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
          })

        // creating JWT Token
        const data={
            user:{
                id: user.id
            }
        }
        const authtoken=jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,authtoken});
    }

    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    

})


// Route:2 Authenticate a User using: POST "/api/auth/login". Doesnot require Authentication.
router.post('/login',[
    body('email','Enter a Valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
    ],async (req, res)=>{

      let  success = false;


    // If there are errors,return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const {email, password}=req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({error : "Please login with correct credential"});
        }

        // return true or false
        const passwordcompare =await bcrypt.compare(password, user.password);
        if(!passwordcompare){
            success = false;
            return res.status(400).json({success,error : "Please login with correct credential"});
        }

        // creating JWT Token
        const data={
            user:{
                id: user.id
            }
        }
        const authtoken=jwt.sign(data, JWT_SECRET);
        success= true;
        res.json({success,authtoken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

    })

//Route:3 Get loggedin User details using: POST "/api/auth/getuser". Login required.  
router.post('/getuser',fetchuser,async (req, res)=>{  
        try {
            userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
module.exports = router