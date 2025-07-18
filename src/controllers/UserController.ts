import { Request, Response } from "express";
import { getUserByUsername, addNewUser } from "../models/UserModel";
import { parseDatabaseError } from "../utils/db-utils";
import argon2 from 'argon2';

async function registarUser(req: Request, res: Response): Promise<void> {
    const { username, password} = req.body as NewUserRequest;
    
    const user = await getUserByUsername(username);
    if (user) {
        res.sendStatus(409);
        return
    }
    
    const passwordHash = await argon2.hash(password);
    try {
        const newUser = await addNewUser(username, passwordHash);
        console.log(newUser);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        const databaseErrorMessage = parseDatabaseError(err);
        res.status(500).json(databaseErrorMessage);
    }

}

async function login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body as NewUserRequest;
    
    const user = await getUserByUsername(username);

    if (!user){
        res.sendStatus(403);
        return;
    }

    const { passwordHash } = user;
    if (!(await argon2.verify(passwordHash, password))){
        res.sendStatus(403);
        return
    }

    await req.session.clearSession();
    req.session.authenticatedUser = {
        userId: user.userId,
        username: user.username,
        isPro: user.isPro,
        isAdmin: user.isAdmin,
    };

    req.session.isLoggedIn = true;
    res.sendStatus(200);
}

export { registarUser, login };