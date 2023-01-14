interface GetLinksMappingArgs {
    type: RouteType
};

interface Link {
    readonly path: string;
    readonly type: RouteType;
}

interface LinksMapping {
    readonly [path: string]: string;
}

interface NavigationProps {
    readonly linksMapping: LinksMapping;
    readonly onRouteClick?: () => void;
    readonly styleOverride?: Record<string, string>;
}