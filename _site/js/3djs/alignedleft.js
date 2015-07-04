var dataset = [5,10,15,20,25,30,35,40,45,10,100];
/*
var svg = d3.select(".chart")
            .selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr({
                cx:function(d,i){
                    return (i*50)+25
                }
                ,cy:function(){
                    return 200;
                }
                ,r:function(d){
                    return d; 
                }
            });
*/
var svg = {};
(function(){
    var self = this
    , width = 500
    , height = 500;

    self.canvas = d3.select(".chart");
    self.canvas.attr({
        width:width
        ,height:height
    });
}).apply(svg)

svg.canvas
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr({
        x:function(d,i){
            return i*41;
        }
        ,y:function(d,i){
            return 500-d;
        }
        ,width:40
        ,height:function(d){
            return d;
        }
        ,fill:function(d){
            return "rgb(0, 0, " + (d * 10) + ")";
        }
    });

svg.canvas
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d){
        return d;
    })
    .attr({
        x:function(d,i){
            return i*(500/dataset.length);
        }
        ,y:function(d){
            return 500 -(d*1);
        }
    });
