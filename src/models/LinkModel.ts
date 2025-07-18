import { AppDataSource } from "../dataSource";
import { Link } from "../entities/Link";

const linkRepository = AppDataSource.getRepository(Link);

async function getLinkByID(linkId: string): Promise <Link | null> {
    const link = await linkRepository.findOne({ where: { linkId}});
    return link;
}

export { getLinkByID };