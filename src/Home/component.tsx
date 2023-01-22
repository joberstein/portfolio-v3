import styles from "./styles.module.scss";
import fushimiInariJpg from "./img/fushimi-inari.jpg";
import fushimiInariJp2 from "./img/fushimi-inari.jp2";
import fushimiInariWebp from "./img/fushimi-inari.webp";
import gundamJpg from "./img/gundam.jpg";
import gundamJp2 from "./img/gundam.jp2";
import gundamWebp from "./img/gundam.webp";
import himejiJpg from "./img/himeji.jpg";
import himejiJp2 from "./img/himeji.jp2";
import himejiWebp from "./img/himeji.webp";
import hydrangeaJpg from "./img/hydrangea.jpg";
import hydrangeaJp2 from "./img/hydrangea.jp2";
import hydrangeaWebp from "./img/hydrangea.webp";
import kinkakujiJpg from "./img/kinkakuji.jpg";
import kinkakujiJp2 from "./img/kinkakuji.jp2";
import kinkakujiWebp from "./img/kinkakuji.webp";
import naraJpg from "./img/nara.jpg";
import naraJp2 from "./img/nara.jp2";
import naraWebp from "./img/nara.webp";

const fushimiInari = [fushimiInariWebp, fushimiInariJp2, fushimiInariJpg];
const gundam = [gundamWebp, gundamJp2, gundamJpg];
const himeji = [himejiWebp, himejiJp2, himejiJpg];
const hydrangea = [hydrangeaWebp, hydrangeaJp2, hydrangeaJpg];
const kinkakuji = [kinkakujiWebp, kinkakujiJp2, kinkakujiJpg];
const nara = [naraWebp, naraJp2, naraJpg];

const Home = () => (
    <div className={styles.home}>
        <p className={styles.quote}>
            "The only thing that could make this day better is ice cream."
        </p>

        <div className={`${styles.images} ${styles.imagesWide}`}>
            {[himeji, hydrangea, nara].map(images => <Image data={images} key={JSON.stringify(images)}/>)}
        </div>

        <p className={styles.quote}>
            "There are always a million reasons not to do something."
        </p>

        <div className={`${styles.images} ${styles.imagesTall}`}>
            {[gundam, kinkakuji, fushimiInari].map(images => <Image data={images} key={JSON.stringify(images)}/>)}
        </div>
    </div>
);

const Image: React.FC<ImageProps> = ({data}) => {
    const [webp, jp2, jpg] = data;

    return (
        <picture>
            {[webp, jp2].map(image => <source srcSet={image} key={image}/>)}
            <img className={styles.image} src={jpg} alt=""/>
        </picture>
    );
};

export default Home;