var svg = {};
(function(){
    var self = this
    , width = 700
    , height = 500;

    self.canvas = d3.select(".leds");
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
//svg.grid(10);

var leds = {};
(function(){
    var self = this
    , group = svg.canvas.append("g");
    group.append("image")
                  .attr({
                    "xlink:href":"led1.png"
                    ,width:"100%"
                    ,height:"100%"
                    ,'image-rendering':'optimizeQuality'
                    ,transform:'scale(.5)'
                  });
    var ellipse = group.append('ellipse').attr({
        cx:180
        ,cy:230
        ,rx:100
        ,ry:40
        ,fill:'white'
        ,filter:'url(#blur)'
        ,'class':'on'
    })

    , path = group.append('path')
         .attr({
            d:svg.interpolateLine([
                {x:0,y:400}
                ,{x:90,y:230}
                ,{x:270,y:230}
                ,{x:360,y:400}
            ])
            ,fill:'white'
            ,filter:'url(#blur)'
         });

    svg.canvas.on('click',function(){
        console.log("asd2")
        var on = ellipse.classed('on')
        , attr = {
            filter:on?'none':'url(#blur)'
            ,fill:on?'transparent':'white'
            ,'class':on?'':'on'
        };
        path.attr(attr);
        ellipse.attr(attr);

    });

}).apply(leds);

var filter = svg.canvas.append("defs")
    .append("filter")
    .attr("id", "blur")
    .append("feGaussianBlur")
    .attr("stdDeviation", 5);
function blur(){
    filter.attr("stdDeviation", 10);
}

