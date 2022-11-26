import { JwtModuleOptions } from '@nestjs/jwt';

require('dotenv').config();

export const config = {
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_ACCESS_TIME: process.env.JWT_ACCESS_TIME,
  JWT_REFRESH_TIME: process.env.JWT_REFRESH_TIME,
}

export const JWT_CONFIG: JwtModuleOptions = {
  secret: config.JWT_SECRET_KEY,
};