var players = [];
var player = {
  id: 1,
  shotLocations: []
};

var court ={
  width: 725,
  height: 551
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
