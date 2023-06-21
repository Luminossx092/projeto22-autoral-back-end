import { duplicatedEmailError } from '@/errors/duplicated-email-error';
import { invalidCredentialsError } from '@/errors/invalid-credentials-error';
import userRepository from '@/repositories/user-repository';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user,
    token,
  };
}

async function signUp(params: SignUpParams) {
console.log(params)
  const user = await CreateUser(params);
console.log(user)
  const token = await createSession(user.id);
console.log(token)
  return token;
}


async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email);
  if (!user) throw invalidCredentialsError();

  return user;
}

async function CreateUser(params: SignUpParams): Promise<User> {
  const { name, email, password } = params;
console.log(params)
  const user = await userRepository.findByEmail(email);
  console.log(user);
if (user) throw duplicatedEmailError();

  const hashPassword: string = await bcrypt.hash(password, 10);
console.log(hashPassword)
  const newUser = await userRepository.create({ name, email, password: hashPassword });
  return newUser;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<User, 'email' | 'password'>;
export type SignUpParams = Pick<User, 'name' | 'email' | 'password'>;

type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

const authenticationService = {
  signIn,
  signUp
};

export default authenticationService;
