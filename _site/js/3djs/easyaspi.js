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

var circle = svg.canvas
  .selectAll("circle")
  .data(new Array(70))
  .enter();

circle
  .append("circle")
  .attr({
        cy:"50%"
        ,r:5
        ,cx:function(d,i){
            return i*10;
        }
        ,"class":"left"
   });

circle
  .append("circle")
  .attr({
        cy:"50%"
        ,r:5
        ,cx:function(d,i){
            return i*10;
        }
        ,"class":"right"
        ,fill:'red'
   });

var circleLeft = svg.canvas.selectAll("circle.left");
var circleRigth = svg.canvas.selectAll("circle.right");

circleLeft/*.transition()
            .attr("cy","100%")
      .transition()
            .attr("cy","50%")
      .transition()
            .duration(2000)
            .attr("cy","10%")
      .transition()
            .duration(1000)
            .attr("fill","red")*/
      .transition()
            .delay(function(d,i){
                return i*100;
            })
            .duration(3000)
            .attr("cy","5%")
      .transition()
            .delay(function(d,i){
                return i*100+3000
            })
            .duration(3000)
            .attr("cy","95%");

circleRigth
            .attr("transform","rotate(180,250,250)")
            .transition()
            .delay(function(d,i){
                return i*100; 
            })
            .duration(3000)
            .attr("cy","95%")
      .transition()
            .delay(function(d,i){
                return i*100+3000
            })
            .duration(3000)
            .attr("cy","5%");
