d3.json("http://127.0.0.1:5000/housing_data").then(function(data) {

    var medians_2017 = [];
    var medians_2018 = [];
    var medians_2019 = [];

    var county_names = [];

    for (i = 0; i < data.length; i++) {
        medians_2017.push(parseInt(data[i][4]));
        medians_2018.push(parseInt(data[i][5]));
        medians_2019.push(parseInt(data[i][6]));

        county_names.push(data[i][1]);
    }



      
    d3.json("http://127.0.0.1:5000/income_data").then(function(income_data) {
        incomes_2017 = [52478];
        incomes_2018 = [57967];
        incomes_2019 = [59389];  


        for (j = 0; j < county_names.length; j++){
            for (i = 0; i < income_data.length; i++) {
                if (((income_data[i][2] + ' County') == county_names[j]) && (income_data[i][3] == 2017)){
                    incomes_2017.push(income_data[i][4])
                }
                else if (((income_data[i][2] + ' County') == county_names[j]) && (income_data[i][3] == 2018)){
                    incomes_2018.push(income_data[i][4])
                }
                else if (((income_data[i][2] + ' County') == county_names[j]) && (income_data[i][3] == 2019)){
                    incomes_2019.push(income_data[i][4])
                }
            }

        }

    console.log(incomes_2017);
    console.log(incomes_2018);
    console.log(incomes_2019);
    console.log(county_names);

    var trace1 = {
        x: medians_2017,
        y: incomes_2017,
        mode: "markers",
        type: "scatter"
    };
    
    var data = [trace1];
    
    var layout = {
        title: "'Bar' Chart"
        };
    
    Plotly.newPlot("plot", data, layout);

    }).catch(function(error) {
    console.log(error);
    });
}).catch(function(error) {
console.log(error);
});




  