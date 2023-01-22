import styles from "./styles.module.scss";

const TopicList: React.FC<TopicListProps> = ({ topicName, items }) => (
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

export default TopicList;