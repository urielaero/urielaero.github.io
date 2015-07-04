var dataset = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95]
    ,[410, 12], [475, 44], [25, 67], [85, 21], [220,88]
];

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
}).apply(svg);

svg.canvas
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr({
        cx:function(d){
            return d[0];
        }
       ,cy:function(d){
            return d[1];
       }
       ,r:function(d){
            return Math.sqrt( 500 - d[1]);
       }
       ,fill:'black'
    });

svg.canvas
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d){
         return d[0] + "," + d[1];
    })
    .attr({
        x:function(d){
            return d[0];
        }
        ,y:function(d){
            return d[1];
        }
        ,fill:'white'
    })

