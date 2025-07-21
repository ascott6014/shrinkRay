import { createHash } from "crypto";
import { AppDataSource } from "../dataSource";
import { Link } from "../entities/Link";
import { User } from "../entities/User";

export const linkRepository = AppDataSource.getRepository(Link);

async function getLinkByID(linkId: string): Promise <Link | null> {
    const link = await linkRepository.findOne({ where: { linkId}});
    return link;
}


function createLinkId (originalUrl: string, userId: string): string {
    const md5 = createHash('md5');
    md5.update(originalUrl.concat(userId));
    const urlHash = md5.digest('base64url');
    const linkId = urlHash.slice(0, 9);

    return linkId;
}

async function createNewLink (originalUrl: string, linkId: string, creator: User): Promise<Link> {
    const newLink = new Link();
    newLink.linkId = linkId;
    newLink.originalUrl = originalUrl;
    newLink.user = creator;

    await linkRepository.save(newLink);
    return newLink;
}

async function updateLinkVisits(link: Link): Promise<Link> {
    link.numHits++;
    const now: Date = new Date();
    link.lastAccessedOn = now;

    await linkRepository.save(link);
    return link;
}

async function getLinksByUserId(userId: string): Promise<Link[]> {
    const links = await linkRepository
            .createQueryBuilder('link')
            .where({user: {userId}})
            .leftJoin("link.user", "user")
            .select([
                "link.linkId",
                "link.originalUrl",
                "user.userId",
                "user.username",
                "user.isAdmin"
            ])
            .getMany();
    
    return links;
}

async function getLinksByUserIdForOwnAccount(userId: string): Promise<Link[]> {
    const links = await linkRepository
            .createQueryBuilder('link')
            .where({user: {userId}})
            .leftJoin("link.user", "user")
            .select([
                "link.linkId",
                "link.originalUrl",
                "link.numHits",
                "link.lastAccessedOn",
                "user.userId",
                "user.username",
                "user.isPro",
                "user.isAdmin"
            ])
            .getMany();
    
    return links;
}
export { getLinkByID, createLinkId, createNewLink, updateLinkVisits, getLinksByUserId, getLinksByUserIdForOwnAccount };