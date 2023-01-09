import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const TopicList = ({topicName, items}) => (
    <div className={styles.topics}>

        {topicName && (
            <div className={styles.title}>
                <h2>{topicName}</h2>
            </div>
        )}

        {items.length > 0 && (
            <ul className={styles.list}>
                {items.map(item => <li key={item} className={styles.listItem}>{item}</li>)}
            </ul>
        )}
    </div>
);

TopicList.defaultProps = {
    topicName: "",
    items: []
};

TopicList.propTypes = {
    topicName: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string)
};

export default TopicList;