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
    self.width = function(){
        return width;
    };
    self.height = function(){
        return height;
    };
}).apply(svg);

svg.canvas.append("rect")
          .attr({
                x:225
                ,y:225
                ,width:50
                ,height:"70%"
                ,fill:"#783723"
          });
var group = svg.canvas.style("background-color","#75C5F0").append("g")
, triangle = d3.svg
               .line()
               .x(function(d){
                    return d.x;
               })
               .y(function(d){
                    return d.y;
               })
               .interpolate("linear")
, lineDataTriangle = [
                        {x: 0,y:0}
                        ,{x: 200,y:0}
                        ,{x: 100,y: 115}
                      ]
, trianglePosition = [

                        {x:80,y:140,rotate:'(51,70,30)',color:"#007CC3"}
                        ,{x:262,y:112,rotate:'(140,70,30)',color:"#F8C400"}
                        ,{x:293,y:294,rotate:'(228,70,30)',color:"#DD137B"}
                        ,{x:105,y:330,rotate:'(318,70,30)',color:"#009240"}
                     ]

               
group.append("rect")
     .attr({
        x:143
        ,y:143
        ,width:214
        ,height:214
        ,fill:'white'
        ,transform:'rotate(45,255,255)'
     });

group.selectAll("path")
     .data(new Array(4))
     .enter()
     .append("path")
     .attr({
        d:triangle(lineDataTriangle)
        ,transform:function(d,i){
            return "translate("+trianglePosition[i].x+","+trianglePosition[i].y+") rotate"+trianglePosition[i].rotate;
        }
        ,fill:function(d,i){
            return trianglePosition[i].color;
        }
     })

group.append("circle")
     .attr({
        cx:250
        ,cy:250
        ,r:10
        ,fill:'#BBB4D6'
     });
//435,440
//setInterval(function(){
    group.transition()
         .duration(17000)
         .attrTween("transform",function(d,i,a){
            return d3.interpolateString("rotate(0, 250, 250)", "rotate(1440,250,250)");
         });
         
//},6888,true);
