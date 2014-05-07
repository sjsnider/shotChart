var svg = d3.select('body').append('svg')
            .attr('width', court.width)
            .attr('height', court.height)
            .attr('fill', 'url(#court)');

svg.selectAll('image').data(['nba-halfcourt.png']).enter()
    .append('image')
    .attr('xlink:href',function(d){return d;})
    .attr('height', 570)
    .attr('width', 750);

var shots = svg.selectAll('circle').data(player.shotLocations).enter().append('circle')
                    .attr('distance', function(d){return d.shotdistance;})
                    .attr('cx', function(d){return axes.x(d.x);})
                    .attr('cy', function(d){
                      if(d.y < 47) {
                        return axes.y(94-d.y-56);
                      }else{
                        return axes.y(d.y-56);
                      }
                    })
                    .on('mouseover', function(d){
                      d3.select(this).transition().duration(1000)
                        .attr('r', 40);
                      // d3.select(this).append('text')
                      //   .text(function(){return "yoyo";})
                    })
                    .on('mouseout', function(d){
                      d3.select(this).transition().duration(1000)
                        .attr('r', d.attempts/5);
                    })
                    .attr('r', 0)
                    .transition().duration(1000)
                    .attr('r',  function(d){return d.attempts/5;})
                    .attr('fill', function(d){
                      if(d.makes/d.attempts>=0.5) {
                        return '#00FF00';
                      } else {
                        return '#FF0000';
                      }
                    });






