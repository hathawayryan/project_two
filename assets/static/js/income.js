//chart javascript below borrowing from d3-challenge

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 200
};

//variable for the random color function
var color = randomColor();

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
d3.csv("/data/Personal Income by county.csv").then(function(incomeData) {

  // Print data
  console.log(incomeData);

  // Cast the value to a number for number pieces 
  incomeData.forEach(function(data) {
    data.Year = +data.Year;
    data.Per_Capita_Income = +data.Per_Capita_Income;       
  });
  
  filterData = incomeData.filter( function(d) {return d.Per_Capita_Income < 30000})
  //console.log(incomeData, d => d.abbr);

  // scale x to chart width
    const xScale = d3.scaleLinear()
    //   .domain([d3.min(filterData, d => d.Year) -1, 2020])
    .domain([2016, 2020])
    .range([0, chartWidth]);

  // scale y to chart height
    const yScale = d3.scaleLinear()
    // .domain([d3.extent(filterData, d => d.Per_Capita_Income)])
    //    .domain([d3.min(filterData, d => d.Per_Capita_Income) -1, d3.max(filterData, d => d.Per_Capita_Income) +1])
    .domain([22508, 30000])
    .range([chartHeight, 0]);
    
    // Use this for the scatter plot
    var size = d3.scaleLinear()
    .domain([1,30]) 
    .range([1,4]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

  // var drawLine = d3
  //   .line()
  //   .x(d => xScale(d.Year))
  //   .y(d => yScale(d.Per_Capita_Income));
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
    .text("Income per Capita")
    ;
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  chartGroup.selectAll(".dot")
    .data(filterData)
    .enter()
    .append("circle")
    .classed("dot", true)
    .attr("cx", function (d) { return xScale(d.Year); } )
    .attr("cy", function (d) { return yScale(d.Per_Capita_Income); } )
    .attr("r", function (d) { return size(d.Per_Capita_Income / 500); } )
    .style("fill", function (d) {return color; })

    chartGroup.selectAll("text")
    .data(filterData)
    .enter()
    .append("text")
    .text( function(d) {return d.County;})
    // .attr("x", d => d.Year )
    // .attr("y", d => d.Per_Capita_Income)
    .attr("x", function (d) { return xScale(d.Year); } )
    .attr("y", function (d) { return yScale(d.Per_Capita_Income); } )    
    .style("fill", "#000000")
    .style("font-weight", "bold")
    .style("font-size", "11")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle");

}).catch(function(error) {
  console.log(error);
});
