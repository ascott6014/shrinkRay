import { Request, Response } from "express";
import { parseDatabaseError } from "../utils/db-utils";
import { getLinkByID, createLinkId, createNewLink } from "../models/LinkModel";
import { getUserById, getUserLinkCountById } from "../models/UserModel";

async function shortenUrl(req: Request, res: Response): Promise<void> {
    
    
    if (!(req.session.isLoggedIn)){
        res.sendStatus(401); // not logged in
        return;
    }

    const {userId, isAdmin, isPro} = req.session.authenticatedUser;

    const user = await getUserById(userId);
    if (!user){
        res.sendStatus(404); // account not found
        return;
    }

    if (!(isAdmin || isPro)){
        const count = await getUserLinkCountById(userId);
        if (count > 4){
            res.sendStatus(403);
            return;
        }
    }

    const { originalUrl } = req.body as newLinkRequest;
    const linkId = createLinkId(originalUrl, userId);
    try {
        const link = await createNewLink(originalUrl, linkId, user);
        console.log(link);
        res.sendStatus(201);
    } catch(err) {
        console.error(err);
        const databaseErrorMessage = parseDatabaseError(err);
        res.status(500).json(databaseErrorMessage);
    }
}

export { shortenUrl };