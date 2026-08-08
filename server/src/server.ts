import { buildApp } from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function start() {
  const app = buildApp();
  try {
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`Server is listening on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
