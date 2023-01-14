interface GetLinksMappingArgs {
    type: LinkType
};

interface Link {
    readonly path: string;
    readonly type: LinkType;
}

interface LinksMapping {
    readonly [path: string]: string;
}

interface NavigationProps {
    readonly linksMapping: LinksMapping;
    readonly onRouteClick?: () => void;
    readonly styleOverride?: Record<string, string>;
}