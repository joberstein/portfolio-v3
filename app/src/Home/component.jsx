import React from "react";
import styles from "Home/styles.module.scss";
import fushimiInari from "./img/fushimi-inari.jpg";
import gundam from "./img/gundam.jpg";
import himeji from "./img/himeji.jpg";
import hydrangea from "./img/hydrangea.jpg";
import kinkakuji from "./img/kinkakuji.jpg";
import nara from "./img/nara.jpg";

const Home = () => (
    <div className={styles.home}>
        <p className={styles.quote}>
            "The only thing that could make this day better is ice cream."
        </p>

        <div className={`${styles.images} ${styles.imagesWide}`}>
            {[himeji, hydrangea, nara].map(image => <Image data={image} key={image}/>)}
        </div>

        <p className={styles.quote}>
            "There are always a million reasons not to do something."
        </p>

        <div className={`${styles.images} ${styles.imagesTall}`}>
            {[gundam, kinkakuji, fushimiInari].map(image => <Image data={image} key={image}/>)}
        </div>
    </div>
);

const Image = ({data}) => (
    <div>
        <img className={styles.image} src={data} alt=""/>
    </div>
);

export default Home;