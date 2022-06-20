import {buildSectionData} from "PortfolioSection/component";
import spongebob from "./img/spongebob.png";
import fairyTail from "./img/fairy-tail.png";
import clickNCreate from "./img/click-n-create.png";
import twerkingRobot from "./img/twerking-robot.png";
import frogger from "./img/frogger.png";

export default {
	id: "games",
	data: [
		buildSectionData("Spongebob Trivia",
			"Test how much you really know about the popular Nickelodeon show, Spongebob Squarepants.  This project focused " +
			"on extracting information from an XML document and determining whether user input satisfied a condition or not.",
			{
				image: spongebob,
				code: "https://github.com/joberstein/Spongebob-Trivia"
			}),

		buildSectionData("Fairy Tail Magic Quiz",
			"Take this quiz to discover the type of Fairy Tail (an anime) magic you would wield if you were a character in " +
			"that universe.  It was created with information extracted from an XML document, and focuses on the concept of " +
			"dynamic navigation.",
			{
				image: fairyTail,
				code: "https://github.com/joberstein/Fairy-Tail-Magic-Quiz"
			}),

		buildSectionData("Click n' Create",
			"Take a breather and have some fun with this simple clicking game!  Click around and then close shapes you " +
			"create so that they can be filled with a randomly chosen color each time. This game focuses on interpreting " +
			"user input, as well as dynamically creating PShapes in Processing.",
			{
				image: clickNCreate,
				code: "https://github.com/joberstein/Click-n-Create-Shapes"
			}),

		buildSectionData("Twerking Robot",
			"Ever wanted to see R.O.B. from Super Smash Bros. Brawl twerk?  Well, now you can!  Using the mouse, move " +
			"R.O.B. around Battlefield and watch him twerk. He may also light bushes on fire... what a character!",
			{
				image: twerkingRobot,
				code: "https://github.com/joberstein/Twerking-Robot"
			}),

		buildSectionData("Frogger",
			"I designed this game in my Fundamentals of Computer Science 2 class.  My partner and I worked on this project " +
			"for a two week span and took turns coding, finding and resizing the images we used appropriately, and writing " +
			"material for an audience to read so that any person will be able to play our game.\n\nPartner: Sam Davies",
			{
				image: frogger,
				video: "https://www.youtube.com/watch?v=YXut60Z_oP8"
			})
	]
};