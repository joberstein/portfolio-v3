import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import Navigation from "Navigation/component";
import { Outlet, useNavigate, useParams } from "react-router";
import { getSiteLinks, getSiteRoutes, SiteLinkCategory } from "Navigation/util";

const portfolioLinks = getSiteLinks({ type: SiteLinkCategory.Portfolio });
const portfolioPaths = getSiteRoutes({ type: SiteLinkCategory.Portfolio });

const Portfolio = () => {
    const { sectionId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sectionId) {
            const randomIdx = Math.floor(Math.random() * portfolioPaths.length);
            navigate(portfolioPaths[randomIdx]);
        }
    }, [ navigate, sectionId ]);

    return (
        <div className={styles.portfolio}>
            <h1>Portfolio</h1>
            <div className={styles.links}>
                <Navigation links={portfolioLinks} />
            </div>

            <Outlet />
        </div>
    );
}

export default Portfolio;