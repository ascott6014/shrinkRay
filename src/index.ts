import './config'; // Load environment variables
import { getTestById } from './models/TestModel';

const test = await getTestById("string");
console.log(test);