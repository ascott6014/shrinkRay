import { AppDataSource } from '../dataSource';
import { Test } from '../entities/Test';

const testRepository = AppDataSource.getRepository(Test);

async function getTestById(testId: string): Promise<Test | null>{
    const test = await testRepository.findOne({where: { testId } });
    return test;
}

export { getTestById };