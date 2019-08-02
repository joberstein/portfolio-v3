import React from "react";
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
                            {this.getImageOverlay(urls)}
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

        return isLightboxOpen && (
            <Lightbox imageTitle={clickedImage.title}
                      mainSrc={clickedImage.urls.image}
                      prevSrc={imageData[prevImageIdx].urls.image}
                      nextSrc={imageData[nextImageIdx].urls.image}
                      onMovePrevRequest={() => this.setClickedImageIdx(prevImageIdx)}
                      onMoveNextRequest={() => this.setClickedImageIdx(nextImageIdx)}
                      onCloseRequest={() => this.setIsLightboxOpen(false)}
                      enableZoom={false} />
        );
    };

    getImageOverlay = ({image, video, code, link}) => {
        if (code) {
            return this.renderLinkedOverlay(code, Code);
        } else if (video) {
            return this.renderLinkedOverlay(video, Video);
        } else if (link) {
            return this.renderLinkedOverlay(link, Link);
        }

        const imageIdx = this.state.imageData.map(({urls}) => urls.image).indexOf(image);

        const onImageClick = () => this.setIsLightboxOpen(true, imageIdx);
        return this.renderOverlay(Image, {onClick: onImageClick});
    };

    renderOverlay = (DatumType, overlayProps={}) => (
        <div className={styles.overlay} {...overlayProps}>
            <DatumType htmlColor="#FFFFFF" fontSize="inherit"/>
        </div>
    );

    renderLinkedOverlay = (url, DatumType) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
            {this.renderOverlay(DatumType)}
        </a>
    );

    setIsLightboxOpen = (isLightboxOpen, clickedImageIdx=0) => this.setState({isLightboxOpen, clickedImageIdx});

    setClickedImageIdx = clickedImageIdx => this.setState({clickedImageIdx});
}

export const buildSectionData = (title, description, urls={}) => ({title, description, urls});

export default PortfolioSection;