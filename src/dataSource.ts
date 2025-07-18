import 'reflect-metadata';
import { DataSource  } from 'typeorm';
// import { glob } from 'glob';
// import {resolve} from 'path'

if (!process.env.DB_NAME || typeof process.env.DB_NAME !== 'string') {
  throw new Error('DATABASE_NAME environment variable is required in .env file');
}

// This is a wonderfully hideous little hack to get dynamic entity module
// loading working properly on Windows.
// async function loadEntities(): Promise<EntitySchema<unknown>[]> {
//   const globs = await glob('dist/entities/*.js');
//   const entityFilePaths = globs.map((entity) => entity.replace('dist/', './'));
//   const entityImports = entityFilePaths.map((entityFilePath) => import(entityFilePath));
//   const entityModules = await Promise.all(entityImports);
//   const entities = entityModules.map((entity) => entity[Object.keys(entity)[0]]);
//   return entities;
// }

// const entities = await loadEntities();
// console.log(entities);


import { User } from './entities/User';
import { Link } from './entities/Link';

export const AppDataSource = new DataSource({
  synchronize: true,
  logging: false,
  // entities,
  entities: [ User, Link],
  type: 'mysql',
  //database: process.env.DATABASE_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

await AppDataSource.initialize();
