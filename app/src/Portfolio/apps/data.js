import {buildSectionData} from "PortfolioSection/component";
import numberPrinter from "./img/number-printer.png";
import elizasNumbers from "./img/elizas-numbers.jpg";
import mp3Player from "./img/mp3-player.png";

export default {
	id: "apps",
	data: [
		buildSectionData("Number Printer",
			"This app combines the knowledge I gathered from my co-op at Cengage Learning about web apps. It converts a " +
			"given input value (integer or decimal) into English words. Maven and Tomcat are used to build and locally " +
			"host the app, while Google App Engine hosts the app live at a domain. A Java servlet attempts to validate all " +
			"input before the number conversion takes place, and notifies a user if the input does not meet the criteria " +
			"for conversion.",
			{
				image: numberPrinter,
				code: "https://github.com/joberstein/Number-Printer"
			}),

		buildSectionData("Eliza's Numbers",
			"This android app is a guessing game, where a user has 12 guesses to determine a mystery number between 1 and " +
			"1000. The program will inform the user if a guess is higher or lower than the target number, keep a list of " +
			"past guess for the current game, and save a user's lowest number of guesses.",
			{
				image: elizasNumbers,
				code: "https://github.com/joberstein/Elizas-Numbers"
			}),

		buildSectionData("MP3 Player",
			"This MP3 player is completely customizable with XML!  Some features of this player are: it displays extended " +
			"song information for a song that is clicked on, a user can sort songs by four different categories, " +
			"pause/rewind/next song controls are implemented, current time progress for each song is tracked, and there is " +
			"a page system. Since it takes such a long time to download from Github, I'm working on featuring it somewhere " +
			"on this website.",
			{
				image: mp3Player,
				code: "https://github.com/joberstein/MP3-Player"
			})
	]
};