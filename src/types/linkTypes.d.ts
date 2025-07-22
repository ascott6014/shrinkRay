type newLinkRequest = {
    originalUrl: string;
};

type linkIdParams = {
    targetLinkId: string;
}

type deleteLinkParams = {
    targetUserId: string;
    targetLinkId: string;
}