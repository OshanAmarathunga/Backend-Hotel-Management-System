import User from "../models/user.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import dotenv from 'dotenv';

dotenv.config();

export function getUsers(req, res) {
  User.find()
    .then((usersList) => {
      if (usersList.length == 0) {
        res.json({
          list: "No users available of backend!",
        });
      } else {
        res.json({
          list: usersList,
        });
      }
    })
    .catch(() => {
      res.json({
        message: "No users found!",
      });
    });
}

export async function saveUser(req, res) {
  const user = req.body;
  const password = user.password;
  try {
    user.password = await argon2.hash(password);
    console.log(user.password);

    const newUser = new User(user);
    newUser
      .save()
      .then((savedUser) => {
        res.json({
          message: savedUser,
        });
      })
      .catch((e) => {
        res.json({
          message: "Failed",
        });

        console.log("Error message", e);
      });
  } catch (e) {
    console.log(e);
  }
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
  const email = req.body.email;
  User.deleteOne({ email })
    .then(() => {
      res.json({
        message: `User ${email} deleted!`,
      });
    })
    .catch(() => {
      message: "Unsuccessfull!";
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

              const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

              res.status(200).json({
                message: "Login success!",
                user: user,
                token: token,
              });
            }
          }).catch(()=>{
            res.status(500).json({
              message: "Error verifying password.",
            });
          })
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "Server error in user login!",
      });
    });
}
dhjdbgfdbf
rt ttt