import React, { useState } from "react";
import 'react-image-lightbox/style.css';
import {recordInteraction} from "Analytics/service";
import Lightbox from 'react-image-lightbox';
import styles from "./styles.module.scss";
import Video from "@material-ui/icons/VideocamOutlined";
import Image from "@material-ui/icons/Image";
import Link from "@material-ui/icons/Link";
import Code from "@material-ui/icons/Code";
import { Navigate, useParams } from "react-router";
import animation from "Portfolio/animation/data";
import apps from "Portfolio/apps/data";
import drawing from "Portfolio/drawing/data";
import games from "Portfolio/games/data";
import websites from "Portfolio/websites/data";

const allData = {
    animation,
    apps,
    drawing,
    games,
    websites,
};

const PortfolioSection = () => {
    const { sectionId } = useParams();
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [clickedImageIdx, setClickedImageIdx] = useState(0);
    
    const { data = [] } = allData[sectionId] || {};

    if (!data.length) {
        <Navigate to="/" />
    }

    const imageData = data.filter(({urls}) => urls.image !== undefined);

    const renderLightbox = () => {
        const prevImageIdx = (clickedImageIdx + imageData.length - 1) % imageData.length;
        const nextImageIdx = (clickedImageIdx + 1) % imageData.length;
        const clickedImage = imageData[clickedImageIdx];
        const recordImageView = () => recordInteraction("click", clickedImage.title, "image");

        return isLightboxOpen && (
            <Lightbox imageTitle={clickedImage.title}
                      mainSrc={clickedImage.urls.image}
                      prevSrc={imageData[prevImageIdx].urls.image}
                      nextSrc={imageData[nextImageIdx].urls.image}
                      onMovePrevRequest={() => setClickedImageIdx(prevImageIdx, recordImageView)}
                      onMoveNextRequest={() => setClickedImageIdx(nextImageIdx, recordImageView)}
                      onAfterOpen={recordImageView}
                      onCloseRequest={() => setIsLightboxOpen(false)}
                      enableZoom={false} />
        );
    };

    const getImageOverlay = (title, {image, video, code, link}) => {
        if (code) {
            return renderLinkedOverlay(title, "code", code, Code);
        } else if (video) {
            return renderLinkedOverlay(title, "video", video, Video);
        } else if (link) {
            return renderLinkedOverlay(title, "website", link, Link);
        }

        const imageIdx = imageData.map(({urls}) => urls.image).indexOf(image);
        const onClick = () => openLightbox(imageIdx);

        return renderOverlay(Image, { onClick });
    };

    const renderOverlay = (DatumType, overlayProps={}) => (
        <div className={styles.overlay} {...overlayProps}>
            <DatumType fontSize="inherit"/>
        </div>
    );

    const renderLinkedOverlay = (name, type, url, DatumType) => (
        <a href={url} target="_blank" rel="noopener noreferrer" onClick={() => recordInteraction("click", name, type)}>
            {renderOverlay(DatumType)}
        </a>
    );

    const openLightbox = (clickedImageIdx=0) => {
        setIsLightboxOpen(true);
        setClickedImageIdx(clickedImageIdx);
    };

    return (
        <>
            {data.map(({title, description, urls}) => (
                <div key={title} className={styles.datum}>

                    <div className={styles.imageContainer}>
                        <img src={urls.image} alt={title} className={styles.image}/>
                        {getImageOverlay(title, urls)}
                    </div>

                    <div className={styles.text}>
                        <span className={styles.title}>
                            {title}
                        </span>
                        <p className={styles.description}>
                            {description}
                        </p>
                    </div>
                </div>
            ))}

            {renderLightbox()}
        </>
    );
}

export default PortfolioSection;