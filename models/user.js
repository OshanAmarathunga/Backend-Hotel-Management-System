import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String,
    },
    img: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-user&psig=AOvVaw3YfyTvfolf6beIDOfCDtKs&ust=1728218920413000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCGmaij94gDFQAAAAAdAAAAABAE",
    },
    password:{
      type:String
    },

    type:{
      type:String,
      required:true,
      default:"customer"
    },
    whatsapp:{
      type:String,
      required:true
    },
    phone:{
      type:String,
      required:true
    },
    disabled:{
      type:Boolean,
      required:true,
      default:false
    },
    emailVerified:{
      type:Boolean,
      required:true,
      default:false
    }
  });
  
  const User=mongoose.model("Users",userSchema)

  export default User;