import authenticationService, { SignInParams, SignUpParams } from '@/services/authentication-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

async function signIn(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send();
  }
}

async function signUp(req: Request, res: Response) {
  const {name, email, password } = req.body as SignUpParams;
  try {
    const result = await authenticationService.signUp({name, email, password});

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send();
  }
}

const authenticationController = {
  signIn,
  signUp,
}
export default authenticationController;
