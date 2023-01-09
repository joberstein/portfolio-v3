import styles from "./styles.module.scss";
import TopicList from "TopicList/component";
import {technology, videoGames, tvShows, anime, boardGames, travelGoals} from "./constants";

const About = () => (
    <div className={styles.about}>
        <h1>About</h1>

        <div className={styles.bitmoji}/>

        <TopicList topicName="Technology" items={technology}/>
        <TopicList topicName="Video Games" items={videoGames}/>
        <TopicList topicName="TV Shows" items={tvShows}/>
        <TopicList topicName="Anime" items={anime}/>
        <TopicList topicName="Board Games" items={boardGames}/>
        <TopicList topicName="Travel Goals" items={travelGoals}/>
    </div>
);

export default About;