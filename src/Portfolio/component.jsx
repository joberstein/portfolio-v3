import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import Navigation from "Navigation/component";
import { Outlet, useNavigate, useParams } from "react-router";
import { getLinks, LinkTypes } from "Navigation/util";

const portfolioLinks = getLinks({ type: LinkTypes.Portfolio });

const Portfolio = () => {
    const { sectionId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sectionId) {
            const portfolioPaths = Object.keys(portfolioLinks);
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