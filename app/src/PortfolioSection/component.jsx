import React from "react";
import {recordEvent} from "Analytics/service";
import Lightbox from 'react-image-lightbox';
import styles from "./styles.module.scss";
import 'react-image-lightbox/style.css';
import Video from "@material-ui/icons/VideocamOutlined";
import Image from "@material-ui/icons/Image";
import Link from "@material-ui/icons/Link";
import Code from "@material-ui/icons/Code";

class PortfolioSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLightboxOpen: false,
            clickedImageIdx: 0,
            imageData: props.data.filter(({urls}) => urls.image !== undefined)
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.data.map(({title, description, urls}) => (
                    <div key={title} className={styles.datum}>

                        <div className={styles.imageContainer}>
                            <img src={urls.image} alt={title} className={styles.image}/>
                            {this.getImageOverlay(title, urls)}
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

                {this.renderLightbox()}
            </React.Fragment>
        );
    }

    renderLightbox = () => {
        const {clickedImageIdx, imageData, isLightboxOpen} = this.state;
        const prevImageIdx = (clickedImageIdx + imageData.length - 1) % imageData.length;
        const nextImageIdx = (clickedImageIdx + 1) % imageData.length;
        const clickedImage = imageData[clickedImageIdx];
        const recordImageView = () => recordEvent("click", clickedImage.title, "image");

        return isLightboxOpen && (
            <Lightbox imageTitle={clickedImage.title}
                      mainSrc={clickedImage.urls.image}
                      prevSrc={imageData[prevImageIdx].urls.image}
                      nextSrc={imageData[nextImageIdx].urls.image}
                      onMovePrevRequest={() => this.setClickedImageIdx(prevImageIdx, recordImageView)}
                      onMoveNextRequest={() => this.setClickedImageIdx(nextImageIdx, recordImageView)}
                      onAfterOpen={recordImageView}
                      onCloseRequest={() => this.setIsLightboxOpen(false)}
                      enableZoom={false} />
        );
    };

    getImageOverlay = (title, {image, video, code, link}) => {
        if (code) {
            return this.renderLinkedOverlay(title, "code", code, Code);
        } else if (video) {
            return this.renderLinkedOverlay(title, "video", video, Video);
        } else if (link) {
            return this.renderLinkedOverlay(title, "website", link, Link);
        }

        const imageIdx = this.state.imageData.map(({urls}) => urls.image).indexOf(image);
        const onClick = () => this.openLightbox(imageIdx);

        return this.renderOverlay(Image, {onClick});
    };

    renderOverlay = (DatumType, overlayProps={}) => (
        <div className={styles.overlay} {...overlayProps}>
            <DatumType fontSize="inherit"/>
        </div>
    );

    renderLinkedOverlay = (name, type, url, DatumType) => (
        <a href={url} target="_blank" rel="noopener noreferrer" onClick={() => recordEvent("click", name, type)}>
            {this.renderOverlay(DatumType)}
        </a>
    );

    openLightbox = (clickedImageIdx=0) => {
        this.setIsLightboxOpen(true);
        this.setClickedImageIdx(clickedImageIdx);
    };

    setIsLightboxOpen = isLightboxOpen =>
        this.setState({isLightboxOpen});

    setClickedImageIdx = (clickedImageIdx, callback=()=>{}) =>
        this.setState({clickedImageIdx}, callback);
}

export const buildSectionData = (title, description, urls={}) => ({title, description, urls});

export default PortfolioSection;