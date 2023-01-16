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

export enum SiteLinkCategory {
    Base,
    Portfolio
}

const getSiteLinkType = (path: string) => {
    if (basePaths.includes(path)) {
        return SiteLinkCategory.Base;
    }

    if (portfolioPaths.includes(path)) {
        return SiteLinkCategory.Portfolio;
    }
}

const getSiteLinkText = (path: string) => 
    path === "/" ? "Home" : path.toUpperCase().slice(0, 1) + path.slice(1);


const siteLinks: SiteLink[] = [
    ...basePaths,
    ...portfolioPaths,
]
.map(path => ({
    path,
    type: getSiteLinkType(path),
    text: getSiteLinkText(path),
}));

export const getSiteLinks = (filter: Partial<SiteLink>): SiteLink[] => 
    filter ? 
        siteLinks.filter(({ type }) => type === filter.type) : 
        siteLinks;

export const getSiteRoutes = (filter: Partial<SiteLink>): string[] =>
    getSiteLinks(filter).map(({ path }) => path);