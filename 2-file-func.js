const fs = require('fs');


const fullLive = require('./Coutry-Files/ES/live-site.json');
const blank = require('./Coutry-Files/ES/BLANK.json');

const flattenJSON = (obj = {}, res = {}, extraKey = '') => {
  for(key in obj){
      if(typeof obj[key] !== 'object'){
        res[extraKey + key] = obj[key];
      }else{
        flattenJSON(obj[key], res, `${extraKey}${key}.`);
      };
  };
  return res;
};

const flattenedFromLive = flattenJSON(fullLive)
const flattenedBlank = flattenJSON(blank)

function index(obj,is, value) {
  if (typeof is == 'string')
      return index(obj,is.split('.'), value);
  else if (is.length==1 && value!==undefined)
      return obj[is[0]] = value;
  else if (is.length==0)
      return obj;
  else
      return index(obj[is[0]],is.slice(1), value);
}

// for (keyList in flattenedBlank) {
//   if (keyList in flattenedFromDawn) {
//     const fullValue = keyList.split('.').reduce((a,b) => a[b], fullDawn) //get value from property key
//     index(blank, keyList, fullValue) //inject value into json file
//   }
// }

// fs.writeFile ("First-Level.json", JSON.stringify(blank, null, 4), function(err) {
//   if (err) throw err;
//   console.log('complete');
//   setTimeout(secondStep, 5000);
//   }
// );

// function secondStep() {


const UBFileKeyArray = []
for (key in flattenedBlank){
  const UBBottomLevelKey = JSON.stringify(key.split('.').slice(-1)).replace(/[\"[\]']+/g,'')
  UBFileKeyArray.push(UBBottomLevelKey)
}

function getUnique(array) {
  var l = array.length,
      i, j,
      unique = [];

  for (i = 0; i < l; i++) {
      for (j = 0; j < l; j++) {
          if (i === j) {
              continue;
          }
          if (array[i] === array[j]) {
              break;
          }
      }
      if (j === l) {
          unique.push(array[i]);
      }
  }
  return unique;
}

const uniqueArray = getUnique(UBFileKeyArray)
const liveKeyListArray = (Object.keys(flattenedFromLive))

const keysOfValueToInject = []

const getFullListKey = (key) => {
  for (var i = 0; i < uniqueArray.length; i++) {
    if ( key.includes(uniqueArray[i])){
      return keysOfValueToInject.push(key)
    }
  }
}

liveKeyListArray.forEach(item => {
  getFullListKey(item)
})

const locationKeys = []
const getUBListValue = (key) => {
  for (var i = 0; i < uniqueArray.length; i++) {
    if ( key.includes(uniqueArray[i])){
      return locationKeys.push(key)
    }
  }
}
for (key in flattenedBlank){
  getUBListValue(key)
}

// console.log(locationKeys)

let egg = 'null'
function getTheThing(bottom){
  for (var i = 0; i < locationKeys.length; i++) {
    if ( locationKeys[i].includes(bottom)){
      egg = locationKeys[i]
      if (egg == 'null'){
        console.log('banana')
      } else {
        return egg
      }
    }
}}

keysOfValueToInject.forEach(item => {
    let bottomLevel = JSON.stringify(item.split('.').slice(-1)).replace(/[\"[\]']+/g,'')
    let fullValue = item.split('.').reduce((a,b) => a[b], fullLive)
    getTheThing(bottomLevel)
    index(blank, egg, fullValue)
})

fs.writeFile ("finito.json", JSON.stringify(blank, null, 4), function(err) {
  if (err) throw err;
  console.log('Finito!');
  }
);
// }