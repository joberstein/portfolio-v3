import {buildSectionData} from "PortfolioSection/component";
import cubism from "./img/cubism.png";
import portrait from "./img/portrait.png";
import beans from "./img/beans.png";
import lines from "./img/lines.png";
import shapes from "./img/shapes.png";

export default {
	id: "drawing",
	data: [
		buildSectionData("Cubist Portrait",
			"A cubist abstraction of a live model's portrait.  I enjoy the color choices that were made because " +
			"they complement each other nicely.  Compressed Charcoal, Willow Charcoal, and Conte Crayon on Paper. " +
			"18x24 inches.",
			{image: cubism}),

		buildSectionData("Portraiture",
			"The most recent toned portrait I've made, and it's definitely the best one I've ever drawn.  Willow and " +
			"Compressed Charcoal on Paper.  24x18 inches.",
			{image: portrait}),

		buildSectionData("Beans!",
			"An investigation of how systems work using repeating stencils.  What better stencil to use then a bean, " +
			"right!?  Pencil on paper. 18x24 inches.",
			{image: beans}),

		buildSectionData("Line Repetition",
			"Part of a series of 6 similar drawings. This particular piece utilizes high contrast between lines.  The paper " +
			"wasn't actually blue; the picture just happened to come out that way. Pencil on paper. 18x24 inches.",
			{image: lines}),

		buildSectionData("Shaded Shapes",
			"My most recent attempt at toning a drawing (not a portrait).  An effort to access light values, middle grays, " +
			"and rich darks in one piece. Pencil on Paper. 18x24 inches.",
			{image: shapes})
	]
};