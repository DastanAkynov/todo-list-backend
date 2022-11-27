import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { TodoEntity, UserEntity } from '../entities';
require('dotenv').config();

const ENTETIES = [
  UserEntity,
  TodoEntity
]

 const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password:
    process.env.DB_SECRET,
  database:
    process.env.DB_NAME,
  entities: ENTETIES,
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/../migrations/*{.ts,.js}',
  },
  synchronize: false,
  migrationsRun: process.env.NODE_PROCESS === 'production' ? true : false,
  logging: false
};

export default typeOrmConfig

