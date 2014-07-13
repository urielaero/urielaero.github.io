var svg = d3.select(".chart")
        .attr({
                width:500
                ,height:200
            });

var cuadrado = svg.append("rect")
                  .attr({
                        x:60
                        ,y:60
                        ,width:60
                        ,height:60
                  });

cuadrado.transition()
        .attr({
            x:320
            ,width:120
        }).duration(900);
