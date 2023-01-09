import {buildSectionData} from "../util";
import pirates from "./img/pirates.png";
import boxGuy from "./img/box-guy.png";
import henry from "./img/henry.png";
import chalkTalk from "./img/chalktalk.png";
import claymation from "./img/claymation.png";
import workingWeek from "./img/working-week.png";
import lighthouse from "./img/lighthouse.png";
import crystals from "./img/crystals.png";
import fire from "./img/fire.png";
import chanukkah from "./img/chanukkah.png";
import flower from "./img/flower.png";

export default {
	id: "animation",
	data: [
		buildSectionData("Pirate Troubles",
			"A story of two pirates that revolves around matching their actions to the provided soundclip. " +
			"The animation was done in Maya, and we were given these characters, which were rigged by the Eleven-Rig, to animate.",
			{
				image: pirates,
				video: "https://www.youtube.com/watch?v=SDAsH6WmZBM",
			}),

		buildSectionData("The Lift",
			"A man tries to lift a very heavy box, and struggles in the process.  Specifically, in Maya, I " +
			"animated this man walking over to an object, thinking about picking it up, actually picking it up, and then " +
			"walking offscreen with it.",
			{
				image: boxGuy,
				video: "https://www.youtube.com/watch?v=SVHNXw78lVE"
			}),

		buildSectionData("Henry Says Hi",
			"An animation created in Blender in which I create my first character model and character rig, as " +
			"well as explore concepts such as weight painting, vertex groups, constrants, the NLA editor, the Video " +
			"Sequencer, the Action Editor, shape keys, lip synching, and poses.",
			{
				image: henry,
				video: "https://www.youtube.com/watch?v=mNupRvxjJrs"
			}),

		buildSectionData("Chalk Talk Animation",
			"A boy plays catch with a chalk drawing, and soon discovers that the chalkboard is an alternate " +
			"dimension!  The soundtrack in the background is audio taken from iMovie sound clips.\n\n Partners: Alexa " +
			"Azarian & Feng Shen",
			{
				image: chalkTalk,
				video: "https://www.youtube.com/watch?v=qa3wESto2tM",
			}),

		buildSectionData("Claymation",
			"An assortment of colored clay shapes dance to the tune of the 'Gravity Falls' theme song.  This " +
			"took a number of hours to create, even though the actual video looks simple enough! \n\n Partners: Alexa " +
			"Azarian & Feng Shen",
			{
				image: claymation,
				video: "https://www.youtube.com/watch?v=6ia9xy09yy0",
			}),

		buildSectionData("Lyric Animation",
			"A lyric video in which I time the sonics of the song, 'Welcome to the Working Week', by Elvis " +
			"Costello, to the the written lyrics in After Effects.",
			{
				image: workingWeek,
				video: "https://www.youtube.com/watch?v=a0ZUsxdX_-4"
			}),

		buildSectionData("Lighthouse Scene",
			"A short clip of a light rotating around a lighthouse on the shore on a foggy night.  This animation " +
			"was created in Blender in my junior year of high school, so that was a while ago.",
			{
				image: lighthouse,
				video: "https://www.youtube.com/watch?v=cLyVd0Vtmss"
			}),

		buildSectionData("Crystal Planet",
			"A barren planet that only harbors green crystals and fireflies.  It could perhaps be the setting of " +
			"a story where an alien species inhabits an undiscovered planet.  This scene created in Blender back when I " +
			"was still in high school.",
			{image: crystals}),

		buildSectionData("Jungle Campfire",
			"A campfire at night within a tame jungle.  This image demonstrates knowledge of smoke simulations, " +
			"particle systems, and node-compositing.  It was created in Blender during my senior year of high school.",
			{image: fire}),

		buildSectionData("Chanukkah Season",
			"A room filled to the brim with Chanukkah presents and winter decorations!  Menorah candles are " +
			"always so awesome to see lit up!  This image was created in Blender in my junior year of high school.",
			{image: chanukkah}),

		buildSectionData("Feeding the Flower",
			"An invisible hand pours water into a potted plant's soil. Isn't magic fantastic!? This was an " +
			"investigation of fluid simulations in Blender.",
			{image: flower})
	]
};