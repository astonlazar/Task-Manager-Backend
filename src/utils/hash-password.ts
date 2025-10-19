import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const hashed = await bcrypt.hash(password, 12);

  return hashed;
}

export const comparePassword = async (password: string, hashedPassword: string) => {
  const check = await bcrypt.compare(password, hashedPassword);

  return check;
}