interface SiteLink {
    readonly path: string;
    readonly text: string;
    readonly type?: SiteLinkCategory;
}

interface NavigationProps {
    readonly links: SiteLink[];
    readonly onRouteClick?: () => void;
    readonly styleOverride?: Record<string, string>;
}