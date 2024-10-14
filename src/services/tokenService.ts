import jwt from 'jsonwebtoken';

export const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.SECRET_KEY!, { expiresIn: '30d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.SECRET_KEY!);
};
