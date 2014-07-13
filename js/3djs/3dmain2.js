//lineas 
var lineDateInit = [{x:0,y:0}];

var lineDate = [
            {x:1,y:5}
            ,{x:20,y:20}
            ,{x:40,y:10}
            ,{x:50,y:5}
            ,{x:60,y:20}
            ,{x:70,y:10}
]
var lineDate2 = [
            {x:1,y:7}
            ,{x:20,y:25}
            ,{x:40,y:15}
            ,{x:50,y:10}
            ,{x:60,y:25}
            ,{x:70,y:15}
]
var lineFunction = d3.svg.line()
                        .x(function(d){return d.x;})
                        .y(function(d){return d.y})
                        .interpolate("linear");

var svg = d3.select(".chart")
            .attr({
                width:200
                ,height:200
            });

svg.append("path")
    .attr({
        d:lineFunction(lineDateInit)
        ,stroke:'blue'
        ,"stroke-width":2
        ,fill:"none"
    }).transition().delay(950)
    .attr({
        d:lineFunction(lineDate)
        ,stroke:'black'
    });

svg.append("path")
    .attr({
        d:lineFunction(lineDate2)
        ,stroke:'red'
        ,"stroke-width":2
        ,fill:"none"
    }); 
