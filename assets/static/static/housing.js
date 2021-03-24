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

        ratio_2017 = [];
        ratio_2018 = [];
        ratio_2019 = [];

        for (i = 0; i < incomes_2017.length; i++) {
            ratio_2017.push(medians_2017[i]/incomes_2017[i])
        }

        for (i = 0; i < incomes_2018.length; i++) {
            ratio_2018.push(medians_2018[i]/incomes_2018[i])
        }

        for (i = 0; i < incomes_2019.length; i++) {
            ratio_2019.push(medians_2019[i]/incomes_2019[i])
        }

        var combined_list_2017 = [];
        for (i = 0; i < incomes_2017.length; i++) {
            combined_list_2017.push([county_names[i],ratio_2017[i],
            medians_2017[i], incomes_2017[i]]);
        }

        console.log(combined_list_2017);

    function init(){
        var trace1 = {
            x: incomes_2017,
            y: medians_2017,
            mode: "markers",
            marker: {
                color: ratio_2017,
                colorscale: 'Bluered',
                opacity: 0.7,
                size: 15
            },
            text: county_names,
            type: "bubble"
        };
        
        var data = [trace1];
        
        var layout = {
            title: "Median Housing Cost vs Median Income",
            height: 600,
            xaxis: {
                range: [0, 140000],
                title: "Median Income ($)"
            },
            yaxis: {
                range: [0, 500000],
                title: "Median Housing Cost ($)"
            }
        };
        
        Plotly.newPlot("plot", data, layout);
    }

    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("body").on("change", updatePlotly);

    // This function is called when a dropdown menu item is selected
    function updatePlotly() {
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var user_year = dropdownMenu.node().value; 

        var CHART = d3.selectAll("#plot").node();

        var x = [];
        var y = [];
        var marker = {};

        switch(user_year) {
            case "2017":
                x = incomes_2017;
                y = medians_2017;
                marker = {
                    color: ratio_2017,
                    colorscale: 'Bluered',
                    opacity: 0.7,
                    size: 15
                };
                break;
        
            case "2018":
                x = incomes_2018;
                y = medians_2018;
                marker = {
                    color: ratio_2018,
                    colorscale: 'Bluered',
                    opacity: 0.7,
                    size: 15
                };
                break;
        
            case "2019":
                x = incomes_2019;
                y = medians_2019;
                marker = {
                    color: ratio_2019,
                    colorscale: 'Bluered',
                    opacity: 0.7,
                    size: 15
                };
                break;
        
            default:
            x = incomes_2017;
            y = medians_2017;
            marker = {
                color: ratio_2017,
                colorscale: 'Bluered',
                opacity: 0.7,
                size: 15
            };
            break;
        }

        Plotly.restyle(CHART, "x", [x]);
        Plotly.restyle(CHART, "y", [y]);
        Plotly.restyle(CHART, "marker", marker);

    }

    init();

    }).catch(function(error) {
    console.log(error);
    });
}).catch(function(error) {
console.log(error);
});




  