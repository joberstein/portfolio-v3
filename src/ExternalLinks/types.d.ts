type LinkType = 'image' | 'text';

interface Route {
    readonly imagePath: string;
    readonly altText: string;
    readonly text: string;
    readonly link: string;
}

interface ExternalLinkProps {
    readonly linkType: LinkType;
    readonly route: Route;
}

interface ExternalLinksProps {
    readonly linkType: LinkType;
    readonly routes: Route[];
}