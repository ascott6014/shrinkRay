import { AppDataSource } from "../dataSource";
import { User } from "../entities/User";
import { linkRepository } from "./LinkModel";

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

async function getUserLinkCountById(userId: string): Promise<number>{
    const count = await linkRepository.count({where: {user: { userId}}});
    return count;
}

export { getUserByUsername, addNewUser, getUserById, getUserLinkCountById};