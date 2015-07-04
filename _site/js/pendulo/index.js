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
    
    self.interpolateLine = d3.svg.line()
                    .x(function(d){
                        return d.x;
                     })
                    .y(function(d){
                        return d.y;
                    })
                    .interpolate("linear");

    self.grid = function(scale,cb){
        self.canvas.append("g")
                   .selectAll("line")
                   .data(new Array(parseInt(self.height()/scale)))
                   .enter()
                   .append("line")
                   .attr({
                        x1:0
                        ,y1:function(d,i){
                            return i*scale;
                        }
                        ,x2:self.width()
                        ,y2:function(d,i){
                            return i*scale; 
                        }
                        ,stroke:'blue'
                        ,"stroke-width":.5
                   });

        self.canvas.append("g")
                   .selectAll("line")
                   .data(new Array(parseInt(self.width()/scale)))
                   .enter()
                   .append("line")
                   .attr({
                        y1:0
                        ,x1:function(d,i){
                            return i*scale;
                        }
                        ,y2:self.height()
                        ,x2:function(d,i){
                            return i*scale; 
                        }
                        ,stroke:'blue'
                        ,"stroke-width":.5
                   });
    };
}).apply(svg);

var pendulo = {};
(function(){
    var self = this
    , circles = 5;
    self.init = function(){
     
    };
    var groupLines = svg.canvas.append("g")
    , circleWidth = 40
    ,center = svg.width()/2;
    groupLines
              .selectAll("line")
              .data(new Array(circles))
              .enter()
              .append("line")
              .attr({
                    x1:function(d,i){
                        //return i*circleWidth+circleWidth;
                        return i*circleWidth+circleWidth/2;
                    }
                    ,y1:0
                    ,x2:function(d,i){
                        return  i*circleWidth+circleWidth/2;
                    }
                    ,y2:svg.height()/2
                    ,stroke:'blue'
              });
    groupLines.attr({
        transform:'translate(130,50)'
    });

    var groupCircles = svg.canvas.append("g")
    ,dataCircles =   groupCircles
          .selectAll("circle")
          .data(new Array(circles))
          .enter()
          .append("circle")
          .attr({
                cx:function(d,i){
                    return i*circleWidth;
                }
                ,cy:50
                ,r:circleWidth/2
                ,'class':'on'
          });
    var lengthGroup = groupCircles.node().getBBox().width;
    groupCircles.attr({
        transform:'translate('+((svg.width()/2)-(lengthGroup/2))+','+250+')'
    });
    var desaceleracion = 100
    , interval = setInterval(function(){
    if(desaceleracion<=10)
        clearInterval(interval);
    var on =dataCircles.classed('on')
      desaceleracion-=10;
    dataCircles.transition()
               .duration(500)
               .attr({
                    cx:function(d,i){
                        if(i==0 && on){
                            return i*circleWidth-desaceleracion;
                        }
                        else if(i==circles-1 && !on){
                            return i*circleWidth+desaceleracion;
                        }
                        else if(on)
                            return i*circleWidth-3;
                        else
                            return i*circleWidth+3;
                            
                    }
                    ,cy:function(d,i){
                        if(i==0 && on){
                            return 50-(desaceleracion/2);
                        }
                        else if(i==circles-1 && !on){
                            return 50-(desaceleracion/2);
                        }
                        else if(on)
                            return 50;
                        else
                            return 50;
                    
                    }
                    ,'class':on?'':'on'
               });
    },600);
}).apply(pendulo);
