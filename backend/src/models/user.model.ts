import mongoose, {Model, Document, Schema } from "mongoose";
import { string } from "zod";
import bcrypt from "bcrypt";

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
   type:Boolean,
   default:false
},
courses:[{courseid:String}]

},{timestamps:true});
userSchema.pre<IUser>("save",async function(next){
   if(!this.isModified("password")){
      next();
   }
   this.password = await bcrypt.hash(this.password,10);
   next();
});
userSchema.methods.comparePassword = async function(password:string){
   return await bcrypt.compare(password,this.password);
}
const userModel:Model<IUser> = mongoose.model("User",userSchema);
export default userModel;