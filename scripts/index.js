
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
						.style("border", "1px solid black");

				

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
	console.log(timeRange + 30000);

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
   					.domain([lastPlace, firstPlace])
   					.range([h-p, p])

	const yAxis = d3.axisLeft(yScale);

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







});



























