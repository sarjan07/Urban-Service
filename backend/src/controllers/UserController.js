const User = require("../models/UserModel")
const bcrypt = require("bcrypt");
const Role = require("../models/RoleModel")
const mailUtil = require("../utili/MailUtil")
const jwt = require("jsonwebtoken")
const secret = "your sceret key"

const loginUser =async(req,res) =>{
    const email = req.body.email;
    const password = req.body.password;

    const foundUserFromEmail = await User.findOne({email:req.body.email}).populate("roleId");
    console.log(foundUserFromEmail);

    if (foundUserFromEmail != null) {
        const isMatch =bcrypt.compareSync(password, foundUserFromEmail.password);

        if (isMatch == true) {
            res.status(200).json({
                message:"Login Successfully",
                data:foundUserFromEmail,
            });
         } else{
                res.status(404).json({
                    message:"Email is not valid...",
                });
            }
        };
        
}
const signUp = async (req, res) => {
    console.log("Req body : ",req.body);
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hashedPassword;
      const createdUser = await User.create(req.body);
      res.status(201).json({
        message: "user created..",
        data: createdUser,
      });
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: "error",
        data: err,
      });
    }
  };



const addUser1  = async(req,res)=>{

    //try catch if else...
    try{
        const createdUser = await User.create(req.body)
        res.status(201).json({
            message:"user created..",
            data:createdUser
        })

    }catch(err){
        res.status(500).json({
            message:"error!!!!",
            data:err
        })
    }
}

const getAllUsers = async(req,res) => {
    const users =await User.findOne().populate("roleId")
    
    res.json({
        message:"user fetched successfully....",
        data:users
    });
};

const addUser = async(req,res) =>{
    const savedUser = await User.create(req.body)

    res.json({
        message:"user created...",
        data:savedUser
    });
};

const deleteUser = async(req,res) =>{
    const deletedUser = await User.findByIdAndDelete(req.params.id)

    res.json({
        message:"user deleted Sucessfully...",
        data:deletedUser
    });
};

const getUserById = async(req,res) =>{
    // const foundUser = await User.create(req.params.id)

    // res.json({
    //     message:"user fetched...",
    //     data:foundUser



    // });
    try {
        const user = await User.findById(req.params.id); 
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const forgotPassword = async (req, res) => {
    const email = req.body.email;
    const foundUser = await User.findOne({ email: email });
  
    if (foundUser) {
      const token = jwt.sign(foundUser.toObject(), secret);
      console.log(token);
      const url = `http://localhost:5173/resetpassword/${token}`;
      const mailContent = `<html>
                            <a href ="${url}">rest password</a>
                            </html>`;
      //email...
      await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
      res.json({
        message: "reset password link sent to mail.",
      });
    } else {
      res.json({
        message: "user not found register first..",
      });
    }
  };
  
  const resetPassword = async (req, res) => {
    const token = req.body.token; //decode --> email | id
    const newPassword = req.body.password;
  
    const userFromToken = jwt.verify(token, secret);
    //object -->email,id..
    //password encrypt...
    const salt = bcrypt.genSaltSync(10);
    const hashedPasseord = bcrypt.hashSync(newPassword,salt);
  
    const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {
      password: hashedPasseord,
    });
    res.json({
      message: "password updated successfully..",
    });
  };

module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
    getUserById,
    addUser1,
    loginUser,
    signUp,
    forgotPassword,
    resetPassword
}