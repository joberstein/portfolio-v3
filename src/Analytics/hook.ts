import { recordPageView } from "./service";
import { useEffect } from 'react';

export default ({ pathname, search }: UseAnalyticsProps) => {
    useEffect(() => {
        recordPageView(pathname + search);
    }, [ pathname, search ]);
}