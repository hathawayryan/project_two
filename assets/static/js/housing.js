d3.json("http://127.0.0.1:5000/data").then(function(data) {

    var medians_2015 = [];
    var county_names = [];
    
    for (i = 0; i < data.length; i++) {
        medians_2015.push(parseInt(data[i][2]));
        county_names.push(data[i][1]);
    }

    console.log(medians_2015);
    console.log(county_names);

}).catch(function(error) {
console.log(error);
});