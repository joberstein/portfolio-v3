const basePaths = [
    "/",
    "about", 
    "portfolio", 
    "contact",
];

const portfolioPaths = [
    "drawing",
    "animation",
    "apps",
    "games",
    "websites",
];

export enum LinkType {
    Base,
    Portfolio
}

const links: Link[] = [
    ...basePaths.map(path => ({ path, type: LinkType.Base })),
    ...portfolioPaths.map(path => ({ path, type: LinkType.Portfolio })),
];

const getLinkMapping = (path: string) => 
    path === "/" ? "Home" : path.toUpperCase().slice(0, 1) + path.slice(1);

export const getLinksMapping = ({ type }: GetLinksMappingArgs): LinksMapping => links
    .filter(link => link.type === type)
    .reduce((acc, { path }) => ({ ...acc, [path]: getLinkMapping(path) }), {});