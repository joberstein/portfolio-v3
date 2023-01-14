
export const getPathname = () => window.location.pathname;

export const scrollTo = (x: number, y: number) => window.scrollTo(x, y);

// 127.0.0.1/8 is considered localhost for IPv4.
const IPV4_LOCALHOST_PATTERN = /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/;
const IPV6_LOCALHOST = "[::1]";

export const isLocalhost = () => 
    ["localhost", IPV6_LOCALHOST].includes(window.location.hostname) ||
    !!window.location.hostname.match(IPV4_LOCALHOST_PATTERN)