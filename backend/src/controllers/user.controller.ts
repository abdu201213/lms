require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userModel, { IUser } from '../models/user.model';
import catchAsyncError from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';

interface IRegistration {
   name: string;
   email: string;
   password: string;
   avatar?: string;
}

export const registrationUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
   const { name, email, password, avatar }: IRegistration = req.body;

   // Check if user already exists
   const userExist = await userModel.findOne({ email });
   if (userExist) {
      return next(new ErrorHandler("User already exists", 400));
   }

   // Create new user instance
   const newUser: IUser = new userModel({
      name,
      email,
      password,
      avatar,
   });

   // Generate activation token
   const activationToken = createActivationToken(newUser);

   // Send activation token response
   res.status(201).json({
      success: true,
      message: "User registered successfully. Use the activation code to verify your account.",
      activationToken: activationToken.token,
      activationCode: activationToken.activationCode
   });
});

interface IActivationToken {
   token: string;
   activationCode: string;
}

export const createActivationToken = (user: IUser): IActivationToken => {
   const activationCode = Math.floor(10000 + Math.random() * 90000).toString();
   const token = jwt.sign({ user, activationCode }, process.env.JWT_SECRET as string, {
      expiresIn: "10m"
   });
   return { token, activationCode };
};
