import User from "../models/user.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import dotenv from "dotenv";
import admin from "../firebaseConfig.js";
import nodemailer from "nodemailer";
import Otp from "../models/Otp.js";

dotenv.config();

export function getUsers(req, res) {
  const pageSize = parseInt(req.body.pageSize) || 3; 
  const pageNumber = parseInt(req.body.pageNumber) || 1; 

  // Calculate the number of documents to skip
  const skip = (pageNumber - 1) * pageSize;

  User.find()
    .skip(skip) // Skip the documents for previous pages
    .limit(pageSize) // Limit the number of documents to the page size
    .then((usersList) => {
      User.countDocuments().then((totalCount)=>{
          res.json({
            list: usersList,
            pageInfo: {
              currentPage: pageNumber,
              pageSize: pageSize,
              totalUsers: usersList.length,
              totalPages:Math.ceil(totalCount/pageSize)
            },
            
          });
        })
        
        
      
    })
    .catch(() => {
      res.status(500).json({
        message: "Error retrieving users!",
      });
    });
}


export async function saveUser(req, res) {
  const user = req.body;
  const password = user.password;

  try {
    user.password = await argon2.hash(password);

    const newUser = new User(user);
    newUser
      .save()
      .then((savedUser) => {
        const otp = Math.floor(1000 + Math.random() * 9000);

        const newOtp = new Otp({
          email: user.email,
          otp: otp,
        });
        newOtp.save().then(() => {
          sendEmail(user.email, otp);

          res.status(200).json({
            message: savedUser,
          });
        });
      })
      .catch((e) => {
        res.status(400).json({
          message: "Failed",
          error: e.errorResponse,
        });
      });
  } catch (e) {}
}

export function updateUser(req, res) {
  const getEmail = req.body.email;
  const updateDate = req.body;

  User.updateOne({ email: getEmail }, { $set: updateDate })
    .then((result) => {
      res.json({
        message: `user ${getEmail} updated`,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
}

export function deleteUser(req, res) {
  const email = req.params.email;
  console.log(email);

  User.deleteOne({ email: email })
    .then(() => {
      res.status(200).json({
        message: `User ${email} deleted!`,
      });
    })
    .catch(() => {
      res.status(400).json({
        message: "Unsuccessfull !",
      });
    });
}

export function loginUser(req, res) {
  const credentials = req.body;

  User.findOne({ email: credentials.email })
    .then((user) => {
      if (user == null) {
        res.status(404).json({
          message: "User not found!",
        });
      } else {
        argon2
          .verify(user.password, credentials.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              res.json({
                message: `Invalid password! ${credentials.password}`,
              });
            } else {
              const payload = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                type: user.type,
              };

              const token = jwt.sign(payload, process.env.JWT_KEY, {
                expiresIn: "1h",
              });

              res.status(200).json({
                message: "Login success!",
                user: user,
                token: token,
              });
            }
          })
          .catch(() => {
            res.status(500).json({
              message: "Error verifying password.",
            });
          });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "Server error in user login!",
      });
    });
}

export function getUser(req, res) {
  const user = req.user;
  console.log("Req ->", user);

  if (user == null) {
    res.json({
      message: "User not Found!",
    });
  } else {
    res.json({
      message: "Found",
      user,
    });
  }
}

export async function googleLogin(req, res) {
  const token = req.params.token;

  let decodeVal;
  try {
    decodeVal = await admin.auth().verifyIdToken(token);
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error !",
      error: e.message,
    });
  }

  if (decodeVal) {
    const email = decodeVal.email;
    User.findOne({ email: email })
      .then((foundUser) => {
        if (foundUser == null) {
          res.status(404).json({
            message: "User not found!",
          });
        } else {
          const payload = {
            id: foundUser.id,
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            type: foundUser.type,
          };
          const token = jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: "1h",
          });

          res.status(200).json({
            message: "Login Success !",
            user: foundUser,
            token: token,
          });
        }
      })
      .catch((e) => {
        res.json({
          message: "Error",
        });
      });
  } else {
    res.status(500).json({
      message: "Unauthorized Login!",
    });
  }
}

export function sendEmail(email, otp) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.Email,
      pass: process.env.PASSWORD
    },
    tls: {
      rejectUnauthorized: false, // Bypass certificate issues (not recommended for production)
    },
  });

  const message = {
    from: "oooshan94@gmail.com",
    to: email,
    subject: "Validationg OTP",
    text: `Your OTP Code is ,${otp}`,
  };

  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
      // res.status(500).json({
      //   message:"email not sent",
      //   error:err
      // })
    } else {
      console.log("Sent email!");

      // res.status(200).json({
      //   message:"Email Sent",
      //   info:info
      // })
    }
  });
}

export function validateOtp(req,res){
  const otp=req.body.otp;
  const email=req.body.email;

  Otp.find({email:email}).sort({date:-1}).then((otpList)=>{
    if(otpList.length==0){
      res.json({
        message:"Otp is invalid"
      })
    }else{
      const latestOtp=otpList[0];
      if(latestOtp.otp==otp){
        User.findOneAndUpdate({email:email},{emailVerified:true}).then(()=>{
          res.json({
            message:"user email verified successfully"
          })
        })

       
      }else{
        res.json({
          message:"Otp is invalid"
        })
      }
    }
  })
}
