var svg = {};
(function(){
    var self = this
    , width = 700
    , height = 610;

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
  .selectAll("text")
  .data(verbs)
  .enter();

circle
  .append("text")
  .attr({
        
        y:-10
        ,x:function(d,i){
            return i*50;
        }
        ,"class":"left"
        ,fill:'white'
        ,'font-size':'20px'
   })
  .text(function(i){
    return i.text;
  })
  .on('click',function(i){
        var self = $(this);
        var select = $('.buttons p.select');
        if(!select.size()){
            return 0;
        }
        if(select.hasClass('dynamic')){
            if(i.isDynamic){
                i.finaly = 1;
                isWin();
                return d3.select(this).transition().attr("y",-100);
            }
        }else if(select.hasClass('stative')){
            if(i.isStative){
                i.finaly = 1;
                isWin();
                return d3.select(this).transition().attr("y",-100);
            } 
        }
        d3.select(this).attr('fill','red')
        var c = $('.counter').text(parseInt($('.counter').text())-1);
        if(c.text() ==0){
            $('p').css('display','none');
            circleLeft.transition()
                  .duration(900)
                  .attr('y',function(i){
                    return 980;
                  })
                 
                  svg.canvas.append("image")
                  .transition()
                  .delay(800)
                  .attr({
                    "xlink:href":"game_over.jpg"
                    ,width:"100%"
                    ,height:"100%"
                  });
        }

  })

var circleLeft = svg.canvas.selectAll(".left");

circleLeft
      .transition()
            .delay(function(d,i){
                return i*100;
            })
            .duration(3000)
            .attr("y",function(a){
                return Math.floor(Math.random() * 600) + 10;
	    })



d3.selectAll('.buttons p').on('click',function(e){
    $('.msg').css('display','none');
    $('p').css('border','2px solid black').removeClass('select')
    var self = $(this)
    self.css("border",'2px solid red').addClass('select')
})

function isWin(){
    for(var i=0;i<verbs.length;i++){
        if(!verbs[i].finaly)
            return 0;
    }
    svg.canvas.append("image")
    .transition()
    .delay(300)
    .attr({
      "xlink:href":"win.jpg"
      ,width:"100%"
      ,height:"100%"
    });
}

