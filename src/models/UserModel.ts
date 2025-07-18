import { AppDataSource } from "../dataSource";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

async function getUserByUsername(username: string): Promise<User | null> {
    const user = await userRepository.findOne({ where: {username}});
    return user;
}

async function addNewUser(username: string, passwordHash: string): Promise<User | null> {
    const newUser = new User();
    newUser.username = username;
    newUser.passwordHash = passwordHash;

    await userRepository.save(newUser);
    return newUser;
}

async function getUserById(userId: string): Promise< User | null> {
    const user = await userRepository.findOne({where: {userId}})
    return user;
}

export { getUserByUsername, addNewUser, getUserById};