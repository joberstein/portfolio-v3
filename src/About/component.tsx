import styles from "./styles.module.scss";
import TopicList from "TopicList/component";

export const data: Record<string, string[]> = {
    Technology: [
        "Java",
        "JavaScript",
        "Spring",
        "React",
        "HTML/Velocity",
        "CSS/Sass",
        "SQL",
        "Webpack",
        "Git",
        "Maven",
        "Kafka",
        "Docker + Kubernetes",
        "JUnit/Mockito/Selenium"
    ],
    "Video Games": [
        "Super Smash Bros. Ultimate",
        "Paper Mario: The Thousand-Year Door",
        "Super Mario Odyssey",
        "Mario Kart Wii",
        "Pokemon Emerald",
        "Legend of Zelda: Breath of the Wild",
        "Metroid Prime: Trilogy",
        "Professor Layton and the Curious Village"
    ],
    "TV Shows": [
        "The Office",
        "Avatar: the Last Airbender",
        "A Series of Unfortunate Events",
        "Black Mirror",
        "Brooklyn 99",
        "The Great British Baking Show",
        "Community",
        "The Dragon Prince"
    ],
    Anime: [
        "Fairy Tail",
        "My Hero Academia",
        "JoJo's Bizarre Adventures",
        "Attack on Titan",
        "D. Gray Man",
        "Soul Eater",
        "Danganronpa",
        "Stein's Gate"
    ],
    "Board Games": [
        "Code Names",
        "Settlers of Catan",
        "Pandemic",
        "Hanabi",
        "A Ticket to Ride",
        "Betrayal at House on the Hill",
        "Illimat"
    ],
    "Travel Goals": [
        "Netherlands",
        "Denmark",
        "Singapore",
        "Spain",
        "Japan",
        "Israel"
    ],
}

const About = () => (
    <div className={styles.about}>
        <h1>About</h1>

        <div className={styles.bitmoji}/>

        {Object.keys(data).map(topicName => (
            <TopicList key={topicName} topicName={topicName} items={data[topicName]} />
        ))}
    </div>
);

export default About;