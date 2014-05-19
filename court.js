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
  $(function() {
    $('.gameNum').text('Game 1');
  });
  var shots = svg.selectAll('circle.a').data(data).enter().append('circle')
                      .style("stroke", "black")
                      .style("opacity", .5)
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
                      .attr('r',  function(d){
                        if (d.distance<=5){
                          return d.attempts/2;
                        } else{
                          return d.attempts*2;
                        } //d.attempts/5;
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

var nextSet = function(data, random, gameNum){
  $('.gameNum').text('Game ' + gameNum);
  var indexArr=[];
  var curR;
  for(k=0;k<data.length;k++){
    // svg.selectAll('circle').each(function(){
    //   d3.select(this).filter(function(d){
    //     if(axes.x(data[k].x) === parseFloat(d3.select(this).attr('cx')) && axes.y(data[k].y) === parseFloat(d3.select(this).attr('cy'))){
    //       debugger;
    //       indexArr.push(k);
    //       return true;
    //     }
    //   })
    d3.selectAll('circle').filter(function(d){
      var newCy, newCx;
      if(data[k].y < 47) {
        newCy = axes.y(94-data[k].y-56);
      }else{
        newCy = axes.y(data[k].y-56);
      }
      newCx = axes.x(data[k].x);
      debugger;
      if (newCy===parseFloat(this.attributes.cy.value) && newCx===parseFloat(this.attributes.cx.value)){
        indexArr.push(k);
        return true;
      } else {
        return false;
      }

      // if(data[k].x === d.x && data[k].y === d.y){
      //   
      //   return true; 
      // }else{
      //   return false;
      // }
    })
    .attr('makes', function(d){
      var curMakes = parseFloat(this.attributes.makes.value);
      var totMakes = data[k].makes + curMakes;
      return totMakes;
    })
    .attr('attempts', function(d){
      var curAttempts = parseFloat(this.attributes.attempts.value);
      var totAttempts = data[k].attempts + curAttempts;
      return totAttempts;
    })
    .attr('r', 1)
    .transition().duration(1000)
    .attr('r', function(d){
      if (d.distance<=5){
        return parseFloat(this.attributes.attempts.value)/2;
      } else{
        return parseFloat(this.attributes.attempts.value)*2;
      }
    })
    .attr('shotPct', function(d){
      var makes = parseFloat(this.attributes.makes.value);
      var attempts = parseFloat(this.attributes.attempts.value);
      debugger;
      return makes/attempts;
    })
    .attr('fill', function(d){
      //if(d.makes/d.attempts>=0.5) {
      if(parseFloat(this.attributes.shotPct.value)>=.5){
        return '#00FF00';
      } else {
        return '#FF0000';
      }
    })
  }
  // debugger;
  for(var x=indexArr.length-1; x>=0; x--){
    data.splice(indexArr[x],1);
  }
  svg.selectAll('circle.'+random).data(data).enter().append('circle')
                      .style("stroke", "black")
                      .style("opacity", .5)
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
                      .attr('r',  function(d){
                        if (d.distance<=5){
                          return d.attempts/2;
                        } else{
                          return d.attempts*2;
                        } //d.attempts/5;
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
                      .attr('class', random);
};

var alphabet = 'abcdefghijklmnopqrstuvwxyz';

var generateRandomString = function(length) {
  var result = '';
  for (var m = 0; m < length; m++) {
    result += alphabet[Math.floor(Math.random() * 1000) % (alphabet.length - 1)];
  }

  return result;
}

initialData(renderArray[0]);

function doSetTimeout(i, random){
  setTimeout(function(){ nextSet(renderArray[i], random, i+1);}, i*2000);
}

for(var i=1;i<len; i++){
  var random = generateRandomString(8);
  doSetTimeout(i, random);
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









