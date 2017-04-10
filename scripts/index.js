
//Set width, height, padding and timing constants
const w = 900;
const h = 600;
const p = 50;
const minutes = d3.timeParse("%M:%S");
const formatTime = d3.timeFormat("%M:%S");

// Selecet graphContainer Div from html, add style attributes
const graphCont = d3.select(".graphContainer")
						.style("width", "1000px")
						.style("height", "700px")
						.style("border", "1px solid black");

//Append a SVG element to the graph container, applying attributes and style
const svg = graphCont.append("svg")
						.attr("id", "svg")
						.style("width", "900px")
						.style("height", "600px")
						

				

//Set URL constant to JSON data
const URL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
// Get data from JSON file, set error warning
d3.json(URL, (error, data) => {
	if(error) {
		return console.error(error)
	};
	const doping = [];
	const times = [];
	const rank = [];
	//  Push doping allegations and race times into their own arrays
	data.forEach((data)=>{
		data.Doping !== "" ? doping.push(true) : doping.push(false);
		times.push(data.Time);
		rank.push(data.Place);
	})
	//Determine the fastest/slowest race times and the difference
	const fastestTime = minutes(d3.min(times));
	const slowestTime = minutes(d3.max(times));
	const timeRange = slowestTime - fastestTime ;
	const DATA_LENGTH = data.length;

	//Determine min/max rank
	const firstPlace = d3.min(rank);
	const lastPlace = d3.max(rank);
//Set X and Y scales and Axis
	//Add 30 seconds to timeRange to create space on graph
	const xScale = d3.scaleTime()
   					.domain([timeRange + 30000, 0])
   					.range([p, w-(p*2)])

   	const xAxis = d3.axisBottom(xScale)
   					.tickFormat(d3.timeFormat("%M:%S"));

   	const yScale = d3.scaleLinear()
   					.domain([lastPlace + 5, firstPlace])
   					.range([h-p, p])

	const yAxis = d3.axisLeft(yScale);

//Add Title to Graph
svg.append("text")
	.attr("class","title")
	.attr("x",100)
	.attr("y",p)
	.text("Cyclist Times and Doping History")
// Append 'g' elements to SVG for X/Y axis
	svg.append('g')
	.attr("transform", "translate(" + p + ",0)")
    .call(yAxis)

    svg.append("g")
    	.attr("class", "axisBar")
		.attr("transform", "translate(0," + (h - p) + ")")
		.attr("transfrom", "rotate(45)")
		.call(xAxis);
// Append text elements to X/Y axis
	svg.append("text")
		.attr("class","ytext")
		.attr("transform","rotate(-90)")
		.attr("y", 0)
		.attr("x", 0-(h/2) - p)
		.attr("dy","1em")
		.text("Rank");

	svg.append("text")
	   .attr("class","xtext")
	   .attr("x",w/2 - p)
	   .attr("y",h - 5)
	   .attr("text-anchor","middle")
	   .text("Time behind");

// Add the data to the graph
	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("id", (d, i) => "d" + i)
		.attr("cx", (d, i)=> {
			let area = w -(p*2);
			let timeBehind = minutes(d.Time) - fastestTime;
			let x = Math.floor(timeBehind/area)
			return area - (x * 2.84)
		})
		.attr("cy", (d, i)=> {
			let last = h-p;
			let range = h-(p*2);
			let space = (range/40);
			let y = (i+1) * space;
			return y + p;
		})
		.attr('r', 10)
		.attr("fill", (d) => {
			if(d.Doping.length !== 0) {
				return "#BAE1D3";
			} else {
				return "blue"
			}	
		})
		.attr("stroke", "black")
		.on("mouseover", handleMouseOver)
		.on("mouseout", handleMouseOut)
	

	// Add Text to individual data points
function handleMouseOver(d, i)  {
	d3.select(this)
	svg.append("text")
		.attr("class", "names info")
		.attr("id", (d, i) => "name" + this.id)
		.attr("x", 400)
		.attr("y", 300)
		.text((d) => `${data[i].Name}`)
	svg.append("text")
		.attr("class", "ranks info")
		.attr("id", (d, i) => "rank" + this.id)
		.attr("x", 400)
		.attr("y", 330)
		.text((d) => `Rank: ${data[i].Place}`)
	svg.append("text")
		.attr("class", "dopes info")
		.attr("id", (d, i) => "dope" + this.id)
		.attr("x", 400)
		.attr("y", 352)
		.text((d) => {
			if(data[i].Doping === "") {return "Clean"}
			else {return `${data[i].Doping}`}
			})
	svg.append("text")
		.attr("class", "times info")
		.attr("id", (d, i) => "time" + this.id)
		.attr("x", 400)
		.attr("y", 380)
		.text((d) => `Time: ${data[i].Time}`)
}
//Remove text when mouse leaves data point
function handleMouseOut(d, i)  {
	d3.select(this)
	d3.select("#name" + this.id).remove();
	d3.select("#rank" + this.id).remove();
	d3.select("#dope" + this.id).remove();
	d3.select("#time" + this.id).remove();
}

});



























