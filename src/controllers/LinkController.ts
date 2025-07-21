import { Request, Response } from "express";
import { parseDatabaseError } from "../utils/db-utils";
import { getLinkByID, createLinkId, createNewLink, updateLinkVisits } from "../models/LinkModel";
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

async function getOriginalUrl(req: Request, res: Response): Promise<void> {
    const {targetLinkId} = req.params as linkIdParams;
    const link = await getLinkByID(targetLinkId);

    if (!link){
        res.sendStatus(404);
        return
    }

    await updateLinkVisits(link);

    const targetUrl = link.originalUrl;

    res.redirect(301, targetUrl);
    
}

export { shortenUrl, getOriginalUrl };