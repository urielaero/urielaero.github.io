/*//hi
var body = d3.select("body")
, div = body.append("div");
div.html("hello world");
div.style("background-color","red");
*/
/*//html
var data = [4,8,15,16,23,42]
, scale = d3.scale.linear()
    .domain([0,d3.max(data)])
    .range([0,420]);
html
d3.select(".chart")
    .selectAll("div")
    .data(data)
    .enter().append("div")
    .style("width",function(d){
        return scale(d)+"px";
    })
    .style("background","green")
    .text(function(d){return d;});
*/


/*d3.json("data.json",function(err,data){
    console.log(err,data);
    console.log(data.leds.led1);
})*/
/*//svg nativo
var spaceCircles = [30,70,110];

var svgContainer = d3.select(".chart").attr({
    width:200
    ,height:200
}).style("border","1px solid black");

var circles = svgContainer.selectAll("circle")
                            .data(spaceCircles)
                            .enter()
                            .append("circle")

var circleAttributes = circles.attr({
                            cx:function(d){return d;}
                            ,cy:function(d){return d;}
                            ,r:20
                        })
*/
/*//lineas 
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
        d:lineFunction(lineDate)
        ,stroke:'blue'
        ,"stroke-width":2
        ,fill:"none"
    });
svg.append("path")
    .attr({
        d:lineFunction(lineDate2)
        ,stroke:'red'
        ,"stroke-width":2
        ,fill:"none"
    }); 
*/

var svg = d3.select(".chart")
            .attr({
                width:400
                ,height:100
            });
var axisScale = d3.scale.linear()
                        .domain([0,100])
                        .range([0,400]);
var xAxis = d3.svg.axis()
                    .scale(axisScale);

xAxisGroup = svg.append("g").call(xAxis);
