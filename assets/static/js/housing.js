d3.json("http://127.0.0.1:5000/data").then(function(data) {

    // Print the tvData
    console.log(data);  

}).catch(function(error) {
console.log(error);
});