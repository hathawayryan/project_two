d3.json("http://127.0.0.1:5000/data").then(function(data) {
    var id = [];
    var state = [];
    var county = [];
    var year = [];
    var per_capita_income = [];
    var percent_change_yoy = [];
   
    for (i = 0; i < data.length; i++) {
        id.push(parseInt(data[i][0]));
        state.push(data[i][1]);
        county.push(data[i][2]);
        year.push(parseInt(data[i][3]));
        per_capita_income.push(parseInt(data[i][4]));
        percent_change_yoy.push(parseFloat(data[i][5]));
    }
    console.log(id);
    console.log(state);
    console.log(county);
    console.log(year);
    console.log(per_capita_income);
    console.log(percent_change_yoy);
}).catch(function(error) {
console.log(error);
});