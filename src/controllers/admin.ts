import { Request, Response } from 'express';
import User from '../models/user';


export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = Number(req.query.page) || 1;
        const perPage = 10;
        const skip = (page - 1) * perPage;
        const queryParams = req.query;
        const filterQuery = { ...queryParams };
        const totalCount = await User.countDocuments(filterQuery);
        const checkUsers = await User.find(queryParams).select({ password: 0 }).limit(perPage).skip(skip);
        if (!checkUsers) {
            res.status(400).json({ status: false, message: 'Not have any users' });
            return;
        }
        res.status(200).json({
            status: true,
            message: 'All Users',
            data: checkUsers,
            pagination: {
                totalUsers: totalCount,
                currentPage: page,
                totalPages: Math.ceil(totalCount / perPage),
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
        return;
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const { email, name, role } = req.body;

        // Find the user to update
        const user = await User.findById({ _id: id });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Check if the new email already exists in another user's record
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });

            if (existingUser && existingUser._id.toString() !== id) {
                res.status(400).json({ message: 'Email already in use by another user' });
                return;
            }
            user.email = email.toLowerCase();
        }
        user.name = name || user.name;
        user.role = role || user.role;
        await user.save();

        res.status(200).json({ status: true, message: 'User updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete({ _id: id });
        if (!user) {
            res.status(404).json({ message: 'User not found or already deleted' });
            return;
        }
        res.status(200).json({ status: true, message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getUsersRegisteredLast7Days = async (_: Request, res: Response): Promise<void> => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);  // Calculate 7 days ago
        const dates = sevenDaysAgo.toISOString();
        // Find users registered within the last 7 days
        const users = await User.find({ registrationDate: { $gte: dates } }).select({ password: 0 });

        res.status(200).json({
            status: true,
            message: 'Users registered in the last 7 days',
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


