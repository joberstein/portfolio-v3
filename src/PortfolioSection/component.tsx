import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router";
import Modal from "@mui/material/Modal";
import {recordInteraction} from "Analytics/service";
import Video from "@mui/icons-material/VideocamOutlined";
import Image from "@mui/icons-material/Image";
import Link from "@mui/icons-material/Link";
import Code from "@mui/icons-material/Code";
import animation from "Portfolio/animation/data";
import apps from "Portfolio/apps/data";
import drawing from "Portfolio/drawing/data";
import games from "Portfolio/games/data";
import websites from "Portfolio/websites/data";
import styles from "./styles.module.scss";

const allData: Record<SectionDataId, SectionData> = {
    animation,
    apps,
    drawing,
    games,
    websites,
};

const Overlay: React.FC<OverlayProps> = ({ onClick = () => {}, children }) => (
    <div className={styles.overlay} onClick={onClick}>
        {children}
    </div>
);

const LinkedOverlay: React.FC<LinkedOverlayProps> = ({ name, type, url, children }) => (
    <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        onClick={() => recordInteraction({
            action: "click", 
            label: name, 
            category: type,
        })}
    >
        <Overlay>
            {children}
        </Overlay>
    </a>
);

const PortfolioSection: React.FC = () => {
    const { sectionId } = useParams();
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [clickedItem, setClickedItem] = useState<SectionDataItem>();
    
    const { data = [] } = allData[sectionId as SectionDataId] || {};

    useEffect(() => {
        if (isLightboxOpen) {
            recordInteraction({
                action: "click", 
                label: clickedItem?.title,
                category: "image",
            });
        }
    }, [isLightboxOpen, clickedItem?.title]);

    if (!data.length) {
        return <Navigate to="/" />;
    }

    const isCodeDataItem = (item: SectionDataItem): item is CodeDataItem => !!(item as CodeDataItem).code;
    const isWebsiteDataItem = (item: SectionDataItem): item is WebsiteDataItem => !!(item as WebsiteDataItem).link;
    const isVideoDataItem = (item: SectionDataItem): item is VideoDataItem => !!(item as VideoDataItem).video;

    const getImageOverlay = (item: SectionDataItem) => {
        const { title, image } = item;

        if (isCodeDataItem(item)) {
            return (
                <LinkedOverlay name={title} type="code" url={item.code}>
                    <Code fontSize="inherit" />
                </LinkedOverlay>
            );
        } else if (isVideoDataItem(item)) {
            return (
                <LinkedOverlay name={title} type="video" url={item.video}>
                    <Video fontSize="inherit" />
                </LinkedOverlay>
            );
        } else if (isWebsiteDataItem(item)) {
            return (
                <LinkedOverlay name={title} type="website" url={item.link}>
                    <Link fontSize="inherit" />
                </LinkedOverlay>
            );
        }

        const onClick = () => {
            const item = data.find(val => val.image === image);
            setClickedItem(item);
            setIsLightboxOpen(true);
        };

        return (
            <Overlay onClick={onClick}>
                <Image fontSize="inherit" />
            </Overlay>
        );
    };

    return (
        <>
            {data.map(({title, description, image, ...rest }) => (
                <div key={title} className={styles.datum}>

                    <div className={styles.imageContainer}>
                        <img src={image} alt={title} className={styles.image}/>
                        {getImageOverlay({ title, image, description, ...rest })}
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

            <Modal 
                open={isLightboxOpen} 
                onClose={() => setIsLightboxOpen(false)}
                className={styles.imageModal}
            >
                <img 
                    src={clickedItem?.image} 
                    alt={clickedItem?.title} 
                    className={styles.imageInsideModal}
                />
            </Modal>
        </>
    );
}

export default PortfolioSection;