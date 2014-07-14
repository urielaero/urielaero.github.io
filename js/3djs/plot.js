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
//svg.grid(10);

var infoLeds = [
    {
        name:'tipo de led1'
        ,data:[
            {x:1,y:2}
            ,{x:5,y:10}
            ,{x:7,y:8}
            ,{x:9,y:10}
            ,{x:10,y:5}
        ]
        ,attr:{
            stroke:'red'
        }
    }    
    ,{
        name:'tipo de led2'
        ,data:[
            {x:1,y:1}
            ,{x:5,y:12}
            ,{x:11,y:2}
        ]
        ,attr:{
            stroke:'black'
        }
    }
];

var plot = {};
(function(){
    var self = this
    , xScale
    , yScale
    , dataset;
    self.init = function(data){
        dataset = data;
        xScale = d3.scale
                  .linear()
                  .domain([0,self.max("x")])
                  .range([30,svg.width()-30]);

        yScale = d3.scale
                  .linear()
                  .domain([0,self.max("y")])
                  .range([svg.height(),10]);
        axis();
        plot();
        buttons();
    };
    var axis = function(){       
        svg.canvas.append("g")
           .attr({
                "class":"xAxis"
                ,transform:"translate(0,"+(svg.height()-20)+")"
                ,stroke:'black'
                ,fill:'transparent'
            })
           .call(makeAxis(xScale,'bottom',5));
        svg.canvas.append("g")
           .attr({
                "class":"yAxis"
                ,transform:"translate(30,-20)"
                ,stroke:'black'
                ,fill:'transparent'
            })
           .call(makeAxis(yScale,'left',6));
         
    }
    , makeAxis = function(scale,position){
        return d3.svg
                     .axis()
                     .scale(scale)
                     .orient(position);
    
    }
    , plot = function(){
        var group = svg.canvas.append("g");
        dataset.forEach(function(d,i){
                var path = group
                    .append("path")
                    .attr(d.attr)
                    .attr("d",self.interpolateLine(d.data))
                , length = path.node().getTotalLength();
                 
                path.attr({
                        'stroke-dasharray': length + " " + length
                        ,'stroke-dashoffset':length
                });

                dataset[i].path = path;
        });
    }
    , buttons = function(){
        dataset.forEach(function(d,i){
            d3.select('.buttons')
              .append('p')
              .text(d.name)
              .on('click',function(){
                    console.log(this) 
                    d.path
                    .transition()
                    .duration(2000)
                    .ease("linear")
                    .attr("stroke-dashoffset",0);
              });
              
        }); 
    };

    self.max = function(key){
        return d3.max(dataset,function(d){
                        return d3.max(d.data,function(d1){
                            return d1[key];
                        });
        });
    
    };
    self.interpolateLine = d3.svg.line()
                    .x(function(d){
                        return xScale(d.x);
                     })
                    .y(function(d){
                        return yScale(d.y);
                    })
                    .interpolate("cardinal");
}).apply(plot);

plot.init(infoLeds);
