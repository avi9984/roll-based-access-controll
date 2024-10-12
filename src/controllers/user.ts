import { Request, Response } from 'express';
import User from '../models/user';
import { validEmail, validPwd } from '../utils/validator';
import bcrypt from 'bcryptjs'

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, userType } = req.body;
        if (!(name && email && password)) {
            return res.status(400).json({ status: false, message: "Please fill in all fields." })
        }
        if (validEmail(email)) {
            return res.status(400).json({ status: false, message: "Enter a valid email address" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        if (validPwd(password)) {
            return res.status(400).json({
                status: false,
                message:
                    "Password should be 8 characters long and must contain one of 0-9,A-Z,a-z and special characters",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email: email.toLowerCase(),
            userType,
            password: hashedPassword
        });
        await user.save();
        return res.status(201).json({ status: true, message: "User register successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}