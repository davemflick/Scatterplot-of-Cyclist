console.log("Hey")

const w = 900;
const h = 600;
const p = 50;

const graphCont = d3.select(".graphContainer")
						.style("width", "1000px")
						.style("height", "700px")
						.style("border", "1px solid black")

const svg = graphCont.append("svg")
						.attr("id", "svg")
						.style("width", "900px")
						.style("height", "600px")
						.style("border", "1px solid black")
				
						.append("circle")
						.attr('cx', 300)
						.attr('cy', 300)
						.attr('r', 100)
						.attr("fill", "black")