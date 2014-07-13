var dataset = [
        [5, 20], [480, 90], [250, 50], [100, 33], [330, 95]
        ,[410, 12], [475, 44], [25, 67], [85, 21], [220,88]
    ]
, svg = {};
(function(){
    var self = this
    , width = 500
    , height = 100;

    self.canvas = d3.select(".chart");
    self.canvas.attr({
        width:width
        ,height:height
    });
    self.width = function(){
        return width;
    };
    self.height = function(){
        return height;
    };
}).apply(svg);

var xScale = d3.scale
              .linear()
              .domain([0, d3.max(dataset,function(d){
                    return d[0];
              })])
              .range([0,svg.width()]);

var yScale = d3.scale
              .linear()
              .domain([0, d3.max(dataset,function(d){
                    return d[1];
              })])
              .range([svg.height(),0]);

svg.canvas
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr({
        cx:function(d){
            return xScale(d[0]);
        }
       ,cy:function(d){
            return yScale(d[1]);
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
            return xScale(d[0]);
        }
        ,y:function(d){
            return xScale(d[1]);
        }
        ,fill:'blue'
    });

var xAxis = d3.svg
              .axis()
              .scale(xScale)
              .orient("bottom");
svg.canvas.append("g")
           .attr({
                "class":"axis"
                ,transform:"translate(0,"+(svg.height()-20)+")"
            })
           .call(xAxis);
