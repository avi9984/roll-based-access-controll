import { Request, Response } from 'express';
import User from '../models/user';
import { validEmail, validPwd } from '../utils/validator';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import { generateToken } from '../services/tokenService';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
     try {
          const { name, email, password, role } = req.body;
          if (!(name && email && password)) {
               res.status(400).json({ status: false, message: 'Please fill in all fields.' });
               return;
          }
          if (validEmail(email)) {
               res.status(400).json({ status: false, message: 'Enter a valid email address' });
               return;
          }
          const existingUser = await User.findOne({ email });
          if (existingUser) {
               res.status(400).json({ message: 'Email already exists' });
               return;
          }
          if (validPwd(password)) {
               res.status(400).json({
                    status: false,
                    message:
                         'Password should be 8 characters long and must contain one of 0-9,A-Z,a-z and special characters',
               });
               return;
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = new User({
               name,
               email: email.toLowerCase(),
               role,
               password: hashedPassword,
               registrationDate: new Date().toISOString(),
          });
          await user.save();
          res.status(201).json({ status: true, message: 'User register successfully' });
     } catch (error) {
          console.log(error);
          res.status(500).json({ status: false, message: 'Internal Server Error' });
     }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
     try {
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          if (!user || !(await bcrypt.compare(password, user.password))) {
               res.status(400).json({ message: 'Invalid email or password' });
               return;
          }
          const userId = user._id.toString();

          const obj = {
               _id: userId,
               name: user.name,
               email: user.email,
               token: generateToken(userId, user.role),
          };
          res.status(200).json({ status: true, message: 'User login success', data: obj });
     } catch (error) {
          console.log(error);
          res.status(500).json({ status: false, message: 'Internal Server Error' });
     }
};

export const getUserById = async (req: Request, res: Response) => {
     try {
          const id = req.params.id;
          const user = await User.findById(id).select({ password: 0 });
          if (!user) {
               res.status(404).json({ status: false, message: 'User not found' });
          }
          res.status(200).json({ status: true, message: 'User found', data: user });
     } catch (error) {
          console.log(error);
          res.status(500).json({ status: false, message: 'Internal Server Error' });
     }
};