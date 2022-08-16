import prisma from '../../utils/prisma';
import { hashPassword } from '../../utils/hash';
import { CreateUserInput } from './user.schema';

export const createUser = async (input: CreateUserInput) => {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);

  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash },
  });

  return user;
};
