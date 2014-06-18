var players = [];
var player = {
  id: 1,
  shotLocations: []
};

var court ={
  width: 650,
  height: 494
};


var rand = function(func, num){
  return func(num);
};

var axes = {
  x : d3.scale.linear().domain([0,50]).range([0, court.width]),
  y : d3.scale.linear().domain([0,38]).range([0, court.height])
}; 
var getAvgByDist = function(dist){
  if(dist>=0&&dist<3){
    return pctDistance[0];
  } else if (dist>=3&&dist<10){
    return pctDistance[1];
  } else if(dist>=10&&dist<16){
    return pctDistance[2];
  }else if(dist>=16&&dist<23){
    return pctDistance[3];
  }else {
    return pctDistance[4];
  }
}; 
var getColorRange = function(diff){
  debugger;
  if(diff>=16){
    return colorRange[0];
  } else if (diff>=12&&diff<16){
    return colorRange[1];
  } else if (diff>=8&&diff<12){
    return colorRange[2];
  } else if (diff>=4&&diff<8){
    return colorRange[3];
  } else if (diff>=0&&diff<4){
    return colorRange[4];
  } else if (diff>=-4&&diff<0){
    return colorRange[5];
  } else if (diff>=-8&&diff<-4){
    return colorRange[6];
  } else if (diff>=-12&&diff<-8){
    return colorRange[7];
  } else if (diff>=-16&&diff<-12){
    return colorRange[8];
  } else {
    return colorRange[9];
  }
};

var pctDistance = [64.6, 39.8, 41.7, 38.3, 36];
var colorRange = ['#FF0000', '#FF3300', '#FF6600', '#FF9900', '#FFFF00', '#FFFF66', '#CCFF33', '#CCFF66', '#CCFF99', '#CCFFCC'];
// var data = getData();
// // debugger;
// var alreadyHave = function(player, array){
//   for (var x=0; x<array.length; x++){ 
//     if (array[x].name===player){
//       return x;
//     }
//   }
//   return false;
// };

// var alreadyHaveDate = function(date, obj){
//   for (var x=0; x<obj.shotsByGame.length; x++){
//     if(date === obj.shotsByGame[x].date){
//       return x;
//     }
//   }
//   return false;
// };

// var playersArray = [];
// var playerObj = {};
// for (var i=0; i<data.rows.length; i++){
//   var index = alreadyHave(data.rows[i].player, playersArray);
//   if (index !== false){
//     var dateIndex = alreadyHaveDate(data.rows[i].Date, playersArray[index]);
//     if (dateIndex !== false){
//       playersArray[index].shotsByGame[dateIndex].shots.push({x:data.rows[i].x, y:data.rows[i].y, distance: parseFloat(data.rows[i].distance), result: data.rows[i].result});
//     }else{
//       playersArray[index].shotsByGame.push({date: data.rows[i].Date, shots: [{x:data.rows[i].x, y:data.rows[i].y, distance: parseFloat(data.rows[i].distance), result: data.rows[i].result}]});
//     }
//   }else{
//     playersArray.push({name: data.rows[i].player, shotsByGame: [{date: data.rows[i].Date, shots: [{x:data.rows[i].x, y:data.rows[i].y, distance: parseFloat(data.rows[i].distance), result: data.rows[i].result}]}] });
//   }
// }
// // for (var j=0; j<playersArray[84].shotsByGame.length;j++){
// //   player.shotLocations[j] = (playersArray[84].shotsByGame[j].shots);
// // }
// // debugger;
// // player.shotLocations[0] = (playersArray[84].shotsByGame[0].shots);
// // player.shotLocations[1] = (playersArray[84].shotsByGame[1].shots);
// // player.shotLocations[2] = (playersArray[84].shotsByGame[2].shots);
// // player.shotLocations[3] = (playersArray[84].shotsByGame[3].shots);
// // player.shotLocations[4] = (playersArray[84].shotsByGame[4].shots);

var removeDupes = function(dupArray){
  for(var i=0; i<dupArray.length; i++){
    if(dupArray[i].result==='made'){
      dupArray[i].makes = 1;
    } else {
      dupArray[i].makes = 0;
    }
    dupArray[i].attempts = 1;
    if(i!==dupArray.length-1){
      for(var j=i+1;j<dupArray.length;j++){    
        if(dupArray[i].x===dupArray[j].x && dupArray[i].y===dupArray[j].y){
          if(dupArray[j].result==='made')
            dupArray[i].makes++;
          dupArray[i].attempts++;
          dupArray.splice(j,1);
          j--;
        }
      }
    }
    dupArray[i].shotPct = dupArray[i].makes/dupArray[i].attempts;
  }
  return dupArray;
};
// debugger;
// var renderArray =[];
// $.get(
//     "/getData",
//     {name : 'Monta Ellis' },
//     function(data) {
//        console.log('page content: ' + data.data);
//         var playersArray = JSON.parse(data.data);
//         console.log(playersArray.shotsByGame);
//         var len = playersArray.shotsByGame.length;
//         // var len = 6;
//         for (var x=0; x<len; x++){
//           renderArray.push(removeDupes(playersArray.shotsByGame[x].shots));
//         }
//     }
// );
// renderArray[4] = [
//   {
// attempts: 1,
// distance: "18ft",
// makes: 1,
// result: "made",
// shotPct: 1,
// x: 37,
// y: 74
//   },
//   {
// attempts: 2,
// distance: "24ft",
// makes: 2,
// result: "made",
// shotPct: 1,
// x: 2,
// y: 80
//   },
//   {
// attempts: 1,
// distance: "21ft",
// makes: 0,
// result: "missed",
// shotPct: 0,
// x: 15,
// y: 70
//   },
//   {
// attempts: 1,
// distance: "2ft",
// makes: 1,
// result: "made",
// shotPct: 1,
// x: 27,
// y: 88
//   },
//   {
// attempts: 1,
// distance: "1ft",
// makes: 0,
// result: "missed",
// shotPct: 0,
// x: 26,
// y: 88
//   }
// ];
// renderArray[3] = [
//   {
// attempts: 1,
// distance: "18ft",
// makes: 1,
// result: "made",
// shotPct: 1,
// x: 37,
// y: 74
//   },
//   {
// attempts: 2,
// distance: "24ft",
// makes: 2,
// result: "made",
// shotPct: 1,
// x: 2,
// y: 80
//   },
//   {
// attempts: 1,
// distance: "21ft",
// makes: 0,
// result: "missed",
// shotPct: 0,
// x: 15,
// y: 70
//   },
//   {
// attempts: 1,
// distance: "2ft",
// makes: 1,
// result: "made",
// shotPct: 1,
// x: 27,
// y: 88
//   },
//   {
// attempts: 1,
// distance: "1ft",
// makes: 0,
// result: "missed",
// shotPct: 0,
// x: 26,
// y: 88
//   }
// ];
// renderArray[2] = [
//   {
// attempts: 1,
// distance: "18ft",
// makes: 1,
// result: "made",
// shotPct: 1,
// x: 37,
// y: 74
//   },
//   {
// attempts: 2,
// distance: "24ft",
// makes: 2,
// result: "made",
// shotPct: 1,
// x: 2,
// y: 80
//   },
//   {
// attempts: 1,
// distance: "21ft",
// makes: 0,
// result: "missed",
// shotPct: 0,
// x: 15,
// y: 70
//   },
//   {
// attempts: 1,
// distance: "2ft",
// makes: 1,
// result: "made",
// shotPct: 1,
// x: 27,
// y: 88
//   },
//   {
// attempts: 1,
// distance: "1ft",
// makes: 0,
// result: "missed",
// shotPct: 0,
// x: 26,
// y: 88
//   }
// ];
// renderArray[1] = [
//   {
// attempts: 1,
// distance: "18ft",
// makes: 1,
// result: "made",
// shotPct: 1,
// x: 37,
// y: 74
//   },
//   {
// attempts: 2,
// distance: "24ft",
// makes: 2,
// result: "made",
// shotPct: 1,
// x: 2,
// y: 80
//   },
//   {
// attempts: 1,
// distance: "21ft",
// makes: 0,
// result: "missed",
// shotPct: 0,
// x: 15,
// y: 70
//   },
//   {
// attempts: 1,
// distance: "2ft",
// makes: 1,
// result: "made",
// shotPct: 1,
// x: 27,
// y: 88
//   },
//   {
// attempts: 1,
// distance: "1ft",
// makes: 0,
// result: "missed",
// shotPct: 0,
// x: 26,
// y: 88
//   }
// ];

// renderArray[0] = [
//   {
// attempts: 1,
// distance: "18ft",
// makes: 1,
// result: "made",
// shotPct: 1,
// x: 37,
// y: 74
//   },
//   {
// attempts: 2,
// distance: "24ft",
// makes: 2,
// result: "made",
// shotPct: 1,
// x: 2,
// y: 80
//   },
//   {
// attempts: 1,
// distance: "21ft",
// makes: 0,
// result: "missed",
// shotPct: 0,
// x: 15,
// y: 70
//   },
//   {
// attempts: 1,
// distance: "2ft",
// makes: 1,
// result: "made",
// shotPct: 1,
// x: 27,
// y: 88
//   },
//   {
// attempts: 1,
// distance: "1ft",
// makes: 0,
// result: "missed",
// shotPct: 0,
// x: 26,
// y: 88
//   }
// ];
// renderArray[5] = [
//   {
// attempts: 1,
// distance: "18ft",
// makes: 1,
// result: "made",
// shotPct: 1,
// x: 37,
// y: 74
//   },
//   {
// attempts: 2,
// distance: "24ft",
// makes: 2,
// result: "made",
// shotPct: 1,
// x: 2,
// y: 80
//   },
//   {
// attempts: 1,
// distance: "21ft",
// makes: 0,
// result: "missed",
// shotPct: 0,
// x: 15,
// y: 70
//   },
//   {
// attempts: 1,
// distance: "2ft",
// makes: 1,
// result: "made",
// shotPct: 1,
// x: 27,
// y: 88
//   },
//   {
// attempts: 1,
// distance: "1ft",
// makes: 0,
// result: "missed",
// shotPct: 0,
// x: 26,
// y: 88
//   }
// ];

// var renderArray = removeDupes(player.shotLocations[0]);
// var renderArray2 = removeDupes(player.shotLocations[1]);
// var renderArray3 = removeDupes(player.shotLocations[2]);
// var renderArray4 = removeDupes(player.shotLocations[3]);
// var renderArray5 = removeDupes(player.shotLocations[4]);
// debugger;
// player.shotLocations.push(
//   {
//         "player": "Alan Anderson",
//         "result": "missed",
//         "shotdistance": "10ft",
//         "x": 15,
//         "y": 8,
//         makes: Math.floor(Math.random()*50),
//         attempts: Math.floor(Math.random()*100)
//       },
//       {
//         "player": "Alan Anderson",
//         "result": "made",
//         "shotdistance": "1ft",
//         "x": 24,
//         "y": 6,
//         makes: Math.floor(Math.random()*50),
//         attempts: Math.floor(Math.random()*100)
//       },
//       {
//         "player": "Alan Anderson",
//         "result": "missed",
//         "shotdistance": "23ft",
//         "x": 2,
//         "y": 8,
//         makes: Math.floor(Math.random()*50),
//         attempts: Math.floor(Math.random()*100)
//       },
//       {
//         "player": "Alan Anderson",
//         "result": "made",
//         "shotdistance": "25ft",
//         "x": 7,
//         "y": 24,
//         makes: Math.floor(Math.random()*50),
//         attempts: Math.floor(Math.random()*100)
//       },
//       {
//         "player": "Alan Anderson",
//         "result": "missed",
//         "shotdistance": "25ft",
//         "x": 15,
//         "y": 29,
//         makes: Math.floor(Math.random()*50),
//         attempts: Math.floor(Math.random()*100)
//       },
//       {
//         "player": "Alan Anderson",
//         "result": "missed",
//         "shotdistance": "26ft",
//         "x": 4,
//         "y": 21,
//         makes: Math.floor(Math.random()*50),
//         attempts: Math.floor(Math.random()*100)
//       },
//       {
//         "player": "Alan Anderson",
//         "result": "missed",
//         "shotdistance": "2ft",
//         "x": 23,
//         "y": 7,
//         makes: Math.floor(Math.random()*50),
//         attempts: Math.floor(Math.random()*100)
//       },
//       {
//         "player": "Alan Anderson",
//         "result": "made",
//         "shotdistance": "2ft",
//         "x": 23,
//         "y": 6,
//         makes: Math.floor(Math.random()*50),
//         attempts: Math.floor(Math.random()*100)
//       });
//      // {
//      //    "player": "Al Jefferson",
//      //    "result": "made",
//      //    "shotdistance": "0ft",
//      //    "x": 25,
//      //    "y": 88,
//      //    makes: Math.floor(Math.random()*50),
//      //    attempts: Math.floor(Math.random()*100)
//      //  },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "made",
//       //   "shotdistance": "10ft",
//       //   "x": 35,
//       //   "y": 85,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "missed",
//       //   "shotdistance": "10ft",
//       //   "x": 18,
//       //   "y": 81,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "made",
//       //   "shotdistance": "13ft",
//       //   "x": 13,
//       //   "y": 82,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "missed",
//       //   "shotdistance": "14ft",
//       //   "x": 11,
//       //   "y": 85,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "missed",
//       //   "shotdistance": "14ft",
//       //   "x": 14,
//       //   "y": 79,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "made",
//       //   "shotdistance": "14ft",
//       //   "x": 13,
//       //   "y": 81,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "missed",
//       //   "shotdistance": "15ft",
//       //   "x": 11,
//       //   "y": 83,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "missed",
//       //   "shotdistance": "16ft",
//       //   "x": 11,
//       //   "y": 80,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "made",
//       //   "shotdistance": "17ft",
//       //   "x": 18,
//       //   "y": 72,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "made",
//       //   "shotdistance": "17ft",
//       //   "x": 12,
//       //   "y": 77,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "missed",
//       //   "shotdistance": "17ft",
//       //   "x": 25,
//       //   "y": 71,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "made",
//       //   "shotdistance": "18ft",
//       //   "x": 39,
//       //   "y": 77,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "missed",
//       //   "shotdistance": "18ft",
//       //   "x": 11,
//       //   "y": 77,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "made",
//       //   "shotdistance": "1ft",
//       //   "x": 25,
//       //   "y": 87,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "made",
//       //   "shotdistance": "1ft",
//       //   "x": 26,
//       //   "y": 88,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "made",
//       //   "shotdistance": "1ft",
//       //   "x": 24,
//       //   "y": 87,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "made",
//       //   "shotdistance": "1ft",
//       //   "x": 25,
//       //   "y": 87,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "made",
//       //   "shotdistance": "1ft",
//       //   "x": 26,
//       //   "y": 88,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "made",
//       //   "shotdistance": "1ft",
//       //   "x": 24,
//       //   "y": 88,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "missed",
//       //   "shotdistance": "2ft",
//       //   "x": 25,
//       //   "y": 86,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "missed",
//       //   "shotdistance": "2ft",
//       //   "x": 23,
//       //   "y": 87,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "missed",
//       //   "shotdistance": "2ft",
//       //   "x": 27,
//       //   "y": 87,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "missed",
//       //   "shotdistance": "3ft",
//       //   "x": 27,
//       //   "y": 86,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "made",
//       //   "shotdistance": "6ft",
//       //   "x": 19,
//       //   "y": 86,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "made",
//       //   "shotdistance": "8ft",
//       //   "x": 24,
//       //   "y": 80,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // },
//       // {
//       //   "player": "Al Jefferson",
//       //   "result": "missed",
//       //   "shotdistance": "9ft",
//       //   "x": 24,
//       //   "y": 79,
//       //   makes: Math.floor(Math.random()*50),
//       //   attempts: Math.floor(Math.random()*100)
//       // });

// debugger;

// for (var x=0; x<20; x++){
//   player.shotLocations.push({
//     x: rand(axes.x, Math.floor(Math.random()*47)),
//     y: rand(axes.y, Math.floor(Math.random()*50)),
//     makes: Math.floor(Math.random()*50),
//     attempts: Math.floor(Math.random()*100)
//   });
// }

// var csv = 'player,result,shot distance,x,y
// Al Jefferson,made,0ft,25,88';
// // Al Jefferson,made,10ft,35,85
// Al Jefferson,missed,10ft,18,81
// Al Jefferson,made,13ft,13,82
// Al Jefferson,missed,14ft,11,85
// Al Jefferson,missed,14ft,14,79
// // Al Jefferson,made,14ft,13,81
// Al Jefferson,missed,15ft,11,83
// Al Jefferson,missed,16ft,11,80
// Al Jefferson,made,17ft,18,72
// Al Jefferson,made,17ft,12,77
// Al Jefferson,missed,17ft,25,71
// Al Jefferson,made,18ft,39,77
// Al Jefferson,missed,18ft,11,77
// Al Jefferson,made,1ft,25,87
// Al Jefferson,made,1ft,26,88
// Al Jefferson,made,1ft,24,87
// Al Jefferson,made,1ft,25,87
// Al Jefferson,made,1ft,26,88
// Al Jefferson,made,1ft,24,88
// Al Jefferson,missed,2ft,25,86
// Al Jefferson,missed,2ft,23,87
// Al Jefferson,missed,2ft,27,87
// Al Jefferson,missed,3ft,27,86
// Al Jefferson,made,6ft,19,86
// Al Jefferson,made,8ft,24,80
// Al Jefferson,missed,9ft,24,79
// Alan Anderson,missed,10ft,15,8
// Alan Anderson,made,1ft,24,6
// Alan Anderson,missed,23ft,2,8
// Alan Anderson,made,25ft,7,24
// Alan Anderson,missed,25ft,15,29
// Alan Anderson,missed,26ft,4,21
// Alan Anderson,missed,2ft,23,7
// Alan Anderson,made,2ft,23,6
// Andray Blatche,missed,13ft,31,18
// Andray Blatche,missed,17ft,34,21
// Andray Blatche,made,1ft,24,6
// Andray Blatche,missed,2ft,25,8
// Andray Blatche,missed,2ft,27,7
// Andray Blatche,missed,2ft,23,6
// andray blatche,made,7ft,25,13
// Anthony Tolliver,missed,23ft,48,84
// Anthony Tolliver,made,25ft,21,63
// Anthony Tolliver,missed,26ft,35,64
// Cody Zeller,made,19ft,8,79
// Cody Zeller,made,1ft,24,88
// Cody Zeller,missed,2ft,27,88
// Deron Williams,missed,15ft,13,15
// Deron Williams,made,17ft,32,22
// Deron Williams,made,19ft,37,21
// Deron Williams,missed,1ft,24,7
// Deron Williams,made,1ft,24,7
// Deron Williams,made,21ft,44,15
// Deron Williams,missed,21ft,14,24
// Deron Williams,made,23ft,2,7
// Deron Williams,missed,23ft,48,10
// Deron Williams,missed,25ft,18,30
// Deron Williams,missed,25ft,29,31
// Deron Williams,missed,25ft,18,30
// Deron Williams,made,26ft,31,31
// Deron Williams,made,26ft,8,26
// Deron Williams,made,26ft,6,24
// Deron Williams,missed,26ft,28,32
// Deron Williams,made,26ft,24,32
// Deron Williams,missed,28ft,18,33
// Deron Williams,made,2ft,23,6
// Deron Williams,missed,6ft,26,12
// Deron Williams,made,7ft,23,13
// Gerald Henderson,missed,15ft,11,82
// Gerald Henderson,made,16ft,9,87
// Gerald Henderson,missed,16ft,40,84
// Gerald Henderson,missed,17ft,18,72
// Gerald Henderson,missed,20ft,28,68
// Gerald Henderson,made,25ft,11,67
// Gerald Henderson,made,2ft,27,88
// Gerald Henderson,missed,31ft,14,59
// Joe Johnson,made,10ft,31,14
// Joe Johnson,missed,13ft,35,14
// Joe Johnson,missed,14ft,39,9
// Joe Johnson,made,15ft,28,21
// Joe Johnson,missed,15ft,12,13
// Joe Johnson,made,23ft,48,7
// Joe Johnson,missed,25ft,6,23
// Joe Johnson,made,25ft,33,30
// Joe Johnson,made,25ft,2,17
// Joe Johnson,made,26ft,38,28
// Joe Johnson,missed,26ft,47,19
// Joe Johnson,missed,26ft,27,32
// Joe Johnson,missed,6ft,25,12
// Joe Johnson,missed,6ft,28,11
// Joe Johnson,missed,8ft,19,12
// Joe Johnson,made,9ft,16,7
// Jorge Gutierrez,made,18ft,37,19
// Jorge Gutierrez,made,19ft,14,21
// Jorge Gutierrez,made,1ft,26,6
// Josh Mcroberts,made,1ft,24,87
// Josh Mcroberts,made,1ft,26,88
// Josh Mcroberts,made,1ft,26,87
// Josh Mcroberts,made,1ft,25,87
// Josh Mcroberts,made,2ft,24,86
// Josh McRoberts,missed,3ft,25,85
// Kemba Walker,missed,10ft,35,85
// Kemba Walker,made,12ft,24,76
// Kemba Walker,made,15ft,35,77
// Kemba Walker,missed,15ft,24,73
// Kemba Walker,made,16ft,11,81
// Kemba Walker,made,17ft,40,80
// Kemba Walker,missed,18ft,19,71
// Kemba Walker,missed,19ft,10,77
// Kemba Walker,missed,19ft,24,69
// Kemba Walker,made,19ft,16,71
// Kemba Walker,missed,1ft,24,87
// Kemba Walker,missed,1ft,25,87
// Kemba Walker,missed,23ft,2,84
// Kemba Walker,missed,23ft,48,86
// Kemba Walker,missed,26ft,45,71
// Kemba Walker,missed,26ft,16,64
// Kemba Walker,made,28ft,36,62
// Kemba Walker,made,28ft,39,64
// Kemba Walker,made,2ft,27,88
// Kemba Walker,missed,2ft,23,88
// Kemba Walker,missed,9ft,25,79
// Luke Ridnour,made,16ft,10,84
// Luke Ridnour,made,18ft,7,85
// Luke Ridnour,made,19ft,44,84
// Luke Ridnour,made,25ft,13,66
// Luke Ridnour,missed,27ft,44,69
// Mason Plumlee,made,1ft,25,7
// Mason Plumlee,missed,1ft,24,6
// Mason Plumlee,made,1ft,24,6
// Mirza Teletovic,missed,25ft,32,30
// Mirza Teletovic,missed,25ft,23,31
// Mirza Teletovic,made,25ft,18,30
// Mirza Teletovic,missed,25ft,46,20
// Mirza Teletovic,made,26ft,21,32
// Mirza Teletovic,missed,26ft,34,30
// Mirza Teletovic,made,26ft,13,29
// Mirza Teletovic,made,26ft,21,32
// Mirza Teletovic,missed,26ft,4,21
// Mirza Teletovic,made,26ft,38,28
// Mirza Teletovic,made,27ft,31,32
// Mirza Teletovic,missed,56ft,33,61
// Paul Pierce,made,10ft,19,14
// Paul Pierce,made,11ft,18,14
// Paul Pierce,missed,11ft,27,17
// Paul Pierce,made,25ft,32,30
// Paul Pierce,missed,26ft,20,32
// Paul Pierce,missed,26ft,35,30
// Paul Pierce,missed,26ft,20,32
// Shaun Livingston,made,10ft,21,15
// Shaun Livingston,made,16ft,22,22
// Shaun Livingston,missed,1ft,24,6
// Shaun Livingston,made,2ft,27,6
// Shaun Livingston,missed,9ft,16,9
// Shaun Livingston,missed,9ft,29,14';
// debugger;
// console.log(csv);

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
