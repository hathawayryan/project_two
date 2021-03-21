// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);



// Load data 
d3.json("/data").then(function(incomeData) {

  // Print data
  console.log(incomeData);

  // Cast the value to a number for number pieces 
  incomeData.forEach(function(data) {
    data.Year = +data.Year;
    data.Per_Capita_Income = +data.Per_Capita_Income
    data.Percent_Change_YOY = +data.Percent_Change_YOY;       
  });

  
  // scale x to chart width
    var xScale = d3.scaleLinear()
    .domain([d3.min(incomeData, d => d.Year) , d3.max(incomeData, d => d.Year)])
    .range([0, chartWidth]);

  // scale y to chart height
    var yScale = d3.scaleLinear()
    .domain([d3.min(incomeData, d => d.Per_Capita_Income) -1, d3.max(incomeData, d => d.Per_Capita_Income) +1])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

  var drawLine = d3
    .line()
    .x(data => xScale(data.Year))
    .y(data => yScale(data.Per_Capita_Income));
  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

    //Adding an axis label
    chartGroup.append("text")             
    .attr("class", "x label")
    .style("text-anchor", "end")
    .attr("x", chartWidth)
    .attr("y", chartHeight - 6)
    .text("Year")
    ;

    chartGroup.append("text")             
    .attr("class", "y label")
    .style("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Per Capita Income")
    ;
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  
    // Create code to build the chart
 // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for milesData
    .attr("d", drawLine(incomeData))
    .classed("line", true);



}).catch(function(error) {
  console.log(error);
});


//Next SVG
// Define SVG area dimensions
var svgWidthMap = 960;
var svgHeightMap = 660;

// Define the chart's margins as an object
var chartMarginMap = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidthMap = svgWidthMap - chartMarginMap.left - chartMarginMap.right;
var chartHeightMap = svgHeightMap - chartMarginMap.top - chartMarginMap.bottom;

// Select body, append SVG area to it, and set the dimensions
var svgMap = d3.select("#map")
  .append("svg")
  .attr("height", svgHeightMap)
  .attr("width", svgWidthMap);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroupMap = svgMap.append("g")
  .attr("transform", `translate(${chartMarginMap.left}, ${chartMarginMap.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("hours-of-tv-watched.csv").then(function(tvData) {

  console.log(tvData);

  // Cast the hours value to a number for each piece of tvData
  tvData.forEach(function(d) {
    d.hours = +d.hours;
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScaleMap = d3.scaleBand()
    .domain(tvData.map(d => d.name))
    .range([0, chartWidthMap])
    .padding(0.1);

  // Create a linear scale for the vertical axis.
  var yLinearScaleMap = d3.scaleLinear()
    .domain([0, d3.max(tvData, d => d.hours)])
    .range([chartHeightMap, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxisMap = d3.axisBottom(xBandScaleMap);
  var leftAxisMap = d3.axisLeft(yLinearScaleMap).ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroupMap.append("g")
    .call(leftAxisMap);

  chartGroupMap.append("g")
    .attr("transform", `translate(0, ${chartHeightMap})`)
    .call(bottomAxisMap);

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  chartGroupMap.selectAll(".bar")
    .data(tvData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScaleMap(d.name))
    .attr("y", d => yLinearScaleMap(d.hours))
    .attr("width", xBandScaleMap.bandwidth())
    .attr("height", d => chartHeightMap - yLinearScaleMap(d.hours));

}).catch(function(error) {
  console.log(error);
});

