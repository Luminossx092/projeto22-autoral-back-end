import express from "express";
import cors from "cors";
import { authenticationRouter } from "./routers/authentication-router";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use(authenticationRouter)

/* export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
} */

export default app;
