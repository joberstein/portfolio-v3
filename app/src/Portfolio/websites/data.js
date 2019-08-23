import {buildSectionData} from "PortfolioSection/component";
import portfolioV2 from "./img/portfolio-v2.png";
import portfolioV1 from "./img/portfolio-v1.png";
import portfolioV0 from "./img/portfolio-v0.png";
import emotionMachine from "./img/emotion-machine.png";

export default {
	id: "websites",
	data: [
		buildSectionData("Portfolio Website v2",
			"In this iteration of my portfolio website, I created a new design from wireframes, and " +
			"implemented the site as a Python Flask app with Jinja templates. Since I do not currently own a hosting " +
			"server at the moment, this website is not available for viewing (because of its Python backend).",
			{
				image: portfolioV2,
				code: "https://github.com/joberstein/portfolio-v2"
			}),

		buildSectionData("Portfolio Website v1",
			"This website was my first attempt at designing a from-scratch portfolio website. It was created using HTML, " +
			"CSS, JavaScript and some JQuery code. Wireframes were created in Adobe InDesign, and transferred them to code. " +
			"I borrowed some code in order to create each portfolio piece's modal, but I styled the text and image " +
			"formatting in each modal to fit my needs.  Some functionality that I added onto the original website were " +
			"sticky section titles, smooth scrolling, and an expandable navigation menu.",
			{
				image: portfolioV1,
				link: "https://joberstein.github.com/portfolio-v1"
			}),

		buildSectionData("Emotion Machine",
			"Feeling a little bored?  Try out my Emotion Machine!  Using CSS, I've created a website where, through a " +
			"series of hovers and clicks, a user can experience shapes in a unique way and see fun animations play. The " +
			"pastel color palette is even playful as well!",
			{
				image: emotionMachine,
				link: "https://joberstein.github.com/emotion-machine"
			}),

		buildSectionData("Portfolio Website v0",
			"A simple and very rough portfolio that I created for a Web Basics class.  It is experimental at best, but was " +
			"a building-block for my foundation of learning HTML and CSS and a good way to explore important web design " +
			"fundamentals.  I've updated the text recently, but the website was created at the beginning of my second year " +
			"in college.",
			{
				image: portfolioV0,
				link: "https://joberstein.github.com/portfoliov0"
			})

		// TODO need to recreate the blog
		// buildSectionData("Onward Israel Blog",
		// 	"In the summer of 2014, I traveled to Israel for two months to take part in a program called Onward Israel. " +
		// 	"I interned for two months at Technion University in the Computer Graphics Department, traveled the country, " +
		// 	"and was able to experience culture-shock first hand.  This blog was my effort to record everything that " +
		// 	"happened, and I played with the CSS to make it look a lot more pleasing than it originally did.",
		// 	{image: onward})

		// TODO need to port and rebuild site
		// buildSectionData("Bitcoin Website",
		// 	"This website was developed over the course of an entire semester for my Web Design and Development class. The " +
		// 	"design of the website took many iterations to bring it to where it currently stands. In creating this website, " +
		// 	"I worked a lot with jQuery, page animations, tooltips, and DRY methodology. It's purpose is to cater to " +
		// 	"audiences who may either want to learn more about Bitcoin through it's history, or find out what exactly it is.",
		// 	{
		// 		image: bitcoin,
		// 		link: "http://www.jesseoberstein.com/bitcoin/welcome.html"
		// 	}),
	]
};