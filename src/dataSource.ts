import 'reflect-metadata';
import { DataSource  } from 'typeorm';
// import { glob } from 'glob';
// import {resolve} from 'path'

if (!process.env.DATABASE_NAME || typeof process.env.DATABASE_NAME !== 'string') {
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

import { Test } from './entities/Test';
import { User } from './entities/User';
import { Link } from './entities/Link';

export const AppDataSource = new DataSource({
  synchronize: true,
  logging: false,
  // entities,
  entities: [Test, User, Link],
  type: 'mysql',
  //database: process.env.DATABASE_NAME,
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Random21$',
  database: 'SampleDB'
});

await AppDataSource.initialize();
