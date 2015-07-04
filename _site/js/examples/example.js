var svg = {};
(function(){
    var self = this
    , width = 700
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

var example1 = {};
(function(){
    var self = this
    , nodes = d3.range(100).map(function(i){
        return {index:i}
    })
    , fill = d3.scale.category10()
    , force = d3.layout.force()
                       .nodes(nodes)
                       .size([svg.width(),svg.height()])
                       .on('tick',tick)
                       .start();

    var node = svg.canvas.selectAll('.node')
                         .data(nodes)
                         .enter()
                         .append('circle')
                         .attr({
                            'stroke-width':'1.5px'
                            ,cx:function(d){
                                return d.x;
                            }
                            ,cy:function(d){
                                return d.y
                            }
                            ,r:8
                            ,fill:function(d,i){
                                return fill(i & 3);
                            }
                            ,stroke:function(d,i){
                                return d3.rgb(fill(i & 3)).darker(2);
                            }
                         })
                         .call(force.drag)
                         .on('mousedown',function(){
                            d3.event.stopPropagation();
                         });
    svg.canvas.style('opacity',1e-6)
              .transition()
              .duration(1000)
              .style('opacity',1);
    d3.select("body")
              .on('click',mousedown);
    
    function tick(e){
        var k = 6*e.alpha;
        nodes.forEach(function(d,i){
            d.y += i & 1 ? k:-k;
            d.x += i & 2 ? k:-k;
        });
        node.attr({
            cx:function(d){
                return d.x;
            } 
            ,cy:function(d){
                return d.y;
            }
        });
    }
    function mousedown(){
        nodes.forEach(function(d,i){
            d.x += (Math.random()-.5)*40;
            d.y += (Math.random()-.5)*40;
        });
        force.resume();
    }

}).apply(example1);
