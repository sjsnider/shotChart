var player = {
  id: 1,
  shotLocations: []
};

var court ={
  width: 470,
  height: 500
};


var rand = function(func, num){
  return func(num);
};

var axes = {
  x : d3.scale.linear().domain([0,47]).range([0, court.width]),
  y : d3.scale.linear().domain([0,50]).range([0, court.height])
};

debugger;

for (var x=0; x<20; x++){
  player.shotLocations.push({
    x: rand(axes.x, Math.floor(Math.random()*47)),
    y: rand(axes.y, Math.floor(Math.random()*50)),
    makes: Math.floor(Math.random()*50),
    attempts: Math.floor(Math.random()*100)
  });
}

// var player = {
//  1: {
//     x : 1,
//     y : 2,
//     makes: 21
//     misses: 22
//   },{
//     x : 1,
//     y : 2,
//     made : true
//   },{
//     x : 1,
//     y : 2,
//     made : true
//   },{
//     x : 15,
//     y : 20,
//     made : true
//   },{
//     x : 11,
//     y : 24,
//     made : false
//   },{
//     x : 13,
//     y : 25,
//     made : true
//   },
//   {
//     x : 11,
//     y : 2,
//     made : false
//   },
//   {
//     x : 10,
//     y : 21,
//     made : true
//   },
//   {
//     x : 16,
//     y : 8,
//     made : true
//   },
//   {
//     x : 20,
//     y : 23,
//     made : false
//   },
//   {
//     x : 10,
//     y : 21,
//     made : false
//   },
//   {
//     x : 45,
//     y : 21,
//     made : true
//   },
//   {
//     x : 37,
//     y : 28,
//     made : false
//   },
//   {
//     x : 39,
//     y : 2,
//     made : true
//   },
//   {
//     x : 18,
//     y : 15,
//     made : false
//   },
// ];
