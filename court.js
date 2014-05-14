var svg = d3.select('body').append('svg')
            .attr('width', court.width)
            .attr('height', court.height)
            .attr('fill', 'url(#court)');

svg.selectAll('image').data(['nba-halfcourt.png']).enter()
    .append('image')
    .attr('xlink:href',function(d){return d;})
    .attr('height', 570)
    .attr('width', 750);

var initialData = function(data){
  var shots = svg.selectAll('circle.a').data(data).enter().append('circle')
                      .attr('distance', function(d){return d.distance;})
                      .attr('cx', function(d){return axes.x(d.x);})
                      .attr('cy', function(d){
                        if(d.y < 47) {
                          return axes.y(94-d.y-56);
                        }else{
                          return axes.y(d.y-56);
                        }
                      })
                      // .on('mouseover', function(d){
                      //   d3.select(this).transition().duration(1000)
                      //     .attr('r', 40);
                      //   // d3.select(this).append('text')
                      //   //   .text(function(){return "yoyo";})
                      // })
                      // .on('mouseout', function(d){
                      //   d3.select(this).transition().duration(1000)
                      //     .attr('r', 10);
                      // })
                      .attr('r', 0)
                      .transition().duration(1000)
                      .attr('r',  function(d){return 10; //d.attempts/5;
                        })
                      .attr('fill', function(d){
                        //if(d.makes/d.attempts>=0.5) {
                        if(d.shotPct>=.5){
                          return '#00FF00';
                        } else {
                          return '#FF0000';
                        }
                      })
                      .attr('attempts', function(d){
                        return d.attempts;
                      })
                      .attr('makes', function(d){
                        return d.makes;
                      })
                      .attr('shotPct', function(d){
                        return d.shotPct;
                      })
                      .attr('class', 'a');
};

var nextSet = function(data){
  // debugger;
  var indexArr=[];
  console.log(typeof data);
  for(i=0;i<data.length;i++){
    svg.selectAll('circle').each(function(){
      d3.select(this).filter(function(d){
        if(axes.x(data[i].x) === axes.x(d.x) && axes.y(data[i].y) === axes.y(d.y)){
          indexArr.push(i);
          return true;
        }
      })
      .attr('attempts', parseFloat(d3.select(this).attr('attempts'))+data[i].attempts)
      .attr('makes', parseFloat(d3.select(this).attr('makes'))+data[i].makes)
      .attr('r', parseFloat(d3.select(this).attr('r'))+5*data[i].attempts)
      .attr('shotPct', parseFloat(d3.select(this).attr('makes'))/parseFloat(d3.select(this).attr('attempts')))
    });
  }
  debugger; 
};

initialData(renderArray[0]);

function doSetTimeout(i){
  setTimeout(function(){ nextSet(renderArray[i]);}, i*6000);
}

for(var i=1;i<5; i++){
  // debugger;
  doSetTimeout(i);
}


              // });
// debugger;
// svg.selectAll('circle')
//       .tween('custom', collisionDetectionAndMoveEnemies);

// var collisionDetectionAndMoveEnemies = function (enemy) {
//       debugger;
//       // var domEnemy = d3.select(this);
//       // var startPos =  { cx : parseFloat(domEnemy.attr('cx')), cy : parseFloat(domEnemy.attr('cy'))};
//       // var endPos = { cx : enemy.cx, cy : enemy.cy};
// };
                    // shots.exit().remove();

// var next = function(){
//   alert('hello');
// };









