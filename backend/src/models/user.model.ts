import mongoose, { Document, Schema } from "mongoose";
import { string } from "zod";

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export interface IUser extends Document{
   name:string;
   email:string;
   password:string;
   avatar:{
      public_id:string;
      url:string;
   };
   role:string;
   isVerified:boolean;
   courses:Array<{courseId:string}>;
   comparePassword(password:string):Promise<boolean>;
}

const userSchema:Schema<IUser> = new mongoose.Schema({
   name:{
      type:String,
      required:[true,"Please enter your name"],
   },
   email:{
      type:String,
      required:[true,"Please enter your email"],
      unique:true,
      validate:{
         validator:function(v:string){
            return emailRegexPattern.test(v);
         },
         message:"Please enter a valid email",
   }
},
password:{
   type:String,
   required:[true,"Please enter your password"],
   minlength:[6,"Your password must be longer than 6 characters"],
   select:false,
},
avatar:{
   public_id:String,
   url:String,
},
role:{
   type:String,
   default:"user"
},
isVerified:{
   type:boolean,
   default:false
}

});