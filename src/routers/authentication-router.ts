import authenticationController from "@/controllers/authentication-controller";
import { validateBody } from "@/middlewares/validation-middleware";
import { signInSchema, signUpSchema } from "@/schemas/authentication-schemas";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter
  .post('/sign-in', validateBody(signInSchema), authenticationController.signIn)
  .post('/sign-up', validateBody(signUpSchema), authenticationController.signUp)

export { authenticationRouter };
