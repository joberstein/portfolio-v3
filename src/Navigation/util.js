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

export const LinkTypes = {
    Base: "base",
    Portfolio: "portfolio",
}

const paths = [
    ...basePaths.map(path => ({ path, type: LinkTypes.Base })),
    ...portfolioPaths.map(path => ({ path, type: LinkTypes.Portfolio })),
];

const getLinkMapping = path => 
    path === "/" ? "Home" : path.toUpperCase().slice(0, 1) + path.slice(1);

export const getLinks = ({ type }) => paths
    .filter(path => path.type === type)
    .reduce((acc, { path }) => ({ ...acc, [path]: getLinkMapping(path) }), {});