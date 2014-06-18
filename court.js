var len;
var svg = d3.select('body').append('svg')
            .attr('width', court.width)
            .attr('height', court.height)
            .attr('fill', 'url(#court)');

svg.selectAll('image').data(['nba-halfcourt.png']).enter()
    .append('image')
    .attr('xlink:href',function(d){return d;})
    .attr('height', 418)
    .attr('width', 550);

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
                      .attr('r', 0)
                      .transition().duration(1000)
                      .attr('r',  function(d){
                        if (d.distance<=5){
                          return d.attempts/2;
                        } else{
                          return d.attempts*2;
                        }
                      })
                      .attr('shotPct', function(d){
                        return d.shotPct;
                      })
                      .attr('fill', function(d){
                        var avgByDist = getAvgByDist(d.distance);
                        var shotPct = d.shotPct*100;
                        return getColorRange(shotPct-avgByDist);
                        debugger; 
                      })
                      .attr('diff', function(d){
                        var avgByDist = getAvgByDist(d.distance);
                        var shotPct = d.shotPct*100;
                        return shotPct-avgByDist;
                      })
                      .attr('attempts', function(d){
                        return d.attempts;
                      })
                      .attr('makes', function(d){
                        return d.makes;
                      })
                      .attr('class', 'a');
};

var nextSet = function(data, random, gameNum){
  $('.gameNum').text('Game ' + gameNum);
  var indexArr=[];
  var curR;
  for(k=0;k<data.length;k++){
    d3.selectAll('circle').filter(function(d){
      var newCy, newCx;
      if(data[k].y < 47) {
        newCy = axes.y(94-data[k].y-56);
      }else{
        newCy = axes.y(data[k].y-56);
      }
      newCx = axes.x(data[k].x);
      if (newCy===parseFloat(this.attributes.cy.value) && newCx===parseFloat(this.attributes.cx.value)){
        indexArr.push(k);
        return true;
      } else {
        return false;
      }
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
      return makes/attempts;
    })
    .attr('fill', function(d){
      var avgByDist = getAvgByDist(d.distance);
      var shotPct = parseFloat(this.attributes.shotPct.value)*100;
      return getColorRange(shotPct-avgByDist);
    })
    .attr('diff', function(d){
      var avgByDist = getAvgByDist(d.distance);
      var shotPct = parseFloat(this.attributes.shotPct.value)*100;
      return shotPct-avgByDist;
    })
  }
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
                      .attr('r', 0)
                      .transition().duration(1000)
                      .attr('r',  function(d){
                        if (d.distance<=5){
                          return d.attempts/2;
                        } else{
                          return d.attempts*2;
                        }
                      })
                      .attr('fill', function(d){
                        var avgByDist = getAvgByDist(d.distance);
                        var shotPct = d.shotPct*100;
                        return getColorRange(shotPct-avgByDist);
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
                      .attr('diff', function(d){
                        var avgByDist = getAvgByDist(d.distance);
                        var shotPct = d.shotPct*100;
                        return shotPct-avgByDist;
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
var renderArray =[];
$.get(
  "/getAllPlayers",
  function(data){
    var sel = document.getElementById('players');
    for(var i=0;i<data.length;i++){
      var opt = document.createElement('option');
      opt.innerHTML=data[i].name;
      opt.value = data[i].name;
      sel.appendChild(opt);
    }
  }
);
var timeouts = [];
var displayData = function getComboA(sel) {
  $('circle').remove();
  for (var i=0; i<timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  timeouts = [];
  var value = sel.value;  
  console.log(value);
  $.get(
      "/getData",
      {name : value },
      function(data) {
          renderArray = [];
          var playersArray = JSON.parse(data.data);
          var len = playersArray.shotsByGame.length;
          console.log(playersArray);
          for (var x=0; x<len; x++){
            renderArray.push(removeDupes(playersArray.shotsByGame[x].shots));
          }
          console.log(renderArray.length);
          initialData(renderArray[0]);
          for(var i=1;i<len; i++){
            var random = generateRandomString(8);
            doSetTimeout(i, random);
          }
      }
  );
}

function doSetTimeout(i, random){
  timeouts.push(setTimeout(function(){ nextSet(renderArray[i], random, i+1);}, i*1500));
}










