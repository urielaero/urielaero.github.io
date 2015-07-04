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
        self.canvas.on({
            click:function(){
                var xy = d3.mouse(this);
                if(!cb)
                svg.canvas.append("text")
                          .text(xy)
                          .attr({
                                x:xy[0]
                                ,y:xy[1]
                                ,fill:'red'
                          })
                console.log(",{x:"+xy[0]+",y:"+xy[1]+"}")
                cb && cb({x:xy[0],y:xy[1]});
            }
        });
        cb && cb();
    };

    self.img = function(src){
        svg.canvas.append("image")
                  .attr({
                    "xlink:href":"http://dibujoscolorear.es/wp-content/uploads/dibujos-para-colorear-gratis-325.jpg"
                    ,width:"100%"
                    ,height:"100%"
                  });
    }
}).apply(svg);

svg.img();
//svg.grid(10);
var birdRedLines = [
                    {x:376,y:95}
                    ,{x:356,y:86}
                    ,{x:338,y:76}
                    ,{x:322,y:63}
                    ,{x:317.59375,y:53}
                    ,{x:311.59375,y:34} 
                    ,{x:318.59375,y:22} 
                    ,{x:334.59375,y:18} 
                    ,{x:346.59375,y:20} 
                    ,{x:363.59375,y:28} 
                    ,{x:383.59375,y:42} 
                    ,{x:399.59375,y:56} 
                    ,{x:410.59375,y:71} 
                    ,{x:422.59375,y:86} 
                    ,{x:432.59375,y:102} 
,{x:449.1875,y:113.59375} 
,{x:464.1875,y:123.59375} 
,{x:484.1875,y:135.796875}
,{x:499.1875,y:148.796875}
,{x:510.1875,y:159.796875}
,{x:525.1875,y:175.390625}
,{x:538.1875,y:192.390625}
,{x:556.1875,y:219.796875}
,{x:568.1875,y:249.796875}
,{x:571.1875,y:267.1875}
,{x:575.1875,y:289.1875}
,{x:578.1875,y:306.390625}
,{x:573.1875,y:325.390625}
,{x:569.1875,y:352.59375} 
,{x:564.1875,y:371.59375} 
,{x:560.1875,y:389}
,{x:553.1875,y:402}
,{x:543.1875,y:416}
,{x:525.1875,y:430}
,{x:519.1875,y:437.1875} 
,{x:505.1875,y:445.1875} 
,{x:489.1875,y:455.1875} 
,{x:467.1875,y:465.1875} 
,{x:440.1875,y:472.1875} 
,{x:410.1875,y:478.1875} 
,{x:394.1875,y:479.1875} 
,{x:382.1875,y:479.1875} 
,{x:381.1875,y:479.1875} 
,{x:372.1875,y:479.1875} 
,{x:367.1875,y:479.1875} 
,{x:349.1875,y:475.1875} 
,{x:338.1875,y:474.1875} 
,{x:324.1875,y:471.1875} 
,{x:312.1875,y:467.1875} 
,{x:298.1875,y:463.1875} 
,{x:286.1875,y:457.1875} 
,{x:281.1875,y:455.1875} 
,{x:269.1875,y:449.1875} 
,{x:259.1875,y:444.1875} 
,{x:243.1875,y:433.1875} 
,{x:213.1875,y:410.1875} 
,{x:195.1875,y:386.796875}
,{x:183.1875,y:358.59375} 
,{x:180.1875,y:338.59375} 
,{x:177.1875,y:313.390625}
,{x:177.1875,y:298}
,{x:178.1875,y:280}
,{x:187.1875,y:247}
,{x:188.1875,y:240}
,{x:203.1875,y:212.390625}
,{x:219.1875,y:180.390625}
,{x:229.1875,y:167}
,{x:245.1875,y:149}
,{x:257.1875,y:132.796875}
,{x:279.1875,y:113.796875}
,{x:291.1875,y:106.796875}
,{x:297.1875,y:104.796875}
,{x:275.1875,y:102.390625}
,{x:261.1875,y:95.390625} 
,{x:253.1875,y:88.390625} 

,{x:249.1875,y:78.390625} 

,{x:254.1875,y:70.390625} 
,{x:264.1875,y:62.390625} 
,{x:265.1875,y:62.390625} 
,{x:281.1875,y:56.390625} 
,{x:297.1875,y:57.390625} 
,{x:308.1875,y:60.390625} 
,{x:317.1875,y:61.390625} 
                 ]
, birdRed = svg.canvas.append("path");

svg.grid(10,function(xy){
    if(xy)
        birdRedLines.push(xy);
    birdRed
           .attr({
                d:svg.interpolateLine(birdRedLines)
                ,stroke:'red'
                ,fill:'red'
           });
});
