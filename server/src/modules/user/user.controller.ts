import { FastifyReply, FastifyRequest } from 'fastify';
import { fastify } from '../../app';
import { verifyPassword } from '../../utils/hash';
import { CreateUserInput, LoginRequest } from './user.schema';
import { createUser, findUserByEmail, findUsers } from './user.service';

export const registerUserHandler = async (
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) => {
  const { body } = request;

  try {
    const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
};

export const loginHandler = async (
  request: FastifyRequest<{
    Body: LoginRequest;
  }>,
  reply: FastifyReply
) => {
  const { body } = request;

  // Find user by email
  const user = await findUserByEmail(body.email);

  if (!user) {
    return reply.code(401).send({
      message: 'Invalid email or password',
    });
  }

  // Check password
  const isValid = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  });

  if (isValid) {
    const { password, salt, ...rest } = user;
    return { accessToken: fastify.jwt.sign(rest) };
  }

  return reply.code(401).send({
    message: 'Invalid email or password',
  });
};

export const getUsersHandler = async () => {
  const users = await findUsers();
  return users;
};
