//A game by @Jimmxyz on github : https://github.com/Jimmxyz
//This project was under GNU GENERAL PUBLIC LICENSE Version 3

//Variable
let validInput = true;
let snakeAlive = false;
let snakeDirection = 2;
let longPositionHistory = 2;
let positionHistoryY = [12,11, 10];
let positionHistoryX = [12,12,12];
let appleX = 12;
let appleY = 12;
let color;
let htmlElements = [] 
let time = 300;
let forwardInterval;
let algo = false;
let algoBan = [false, false, false, false];
let algoBest = [101,102,103,104];
let timeBefore = 0;
let tryBefore = 1;


NewBody();
GenNewApple();
visualBackgroundSetup();

document.addEventListener('DOMContentLoaded', getHTMLelements)  
//Get keyboard input
document.addEventListener(
  "keydown",
  (event) => {
    const nomTouche = event.key;
    console.log(nomTouche);
    //input "ArrowRight"
    if (nomTouche === "ArrowRight" && validInput === true) {
      validInput = false;
      if (snakeAlive == false) {
        snakeAlive = true;
        ResetInterval();
      }
      snakeDirection = 2;
      return;
    }
    //input "ArrowLeft"
    if (nomTouche === "ArrowLeft" && validInput === true) {
      validInput = false;
      if (snakeAlive == false) {
        snakeAlive = true;
        ResetInterval();
      }
      snakeDirection = 4;
      return;
    }
    //input "ArrowUp"
    if (nomTouche === "ArrowUp" && validInput === true) {
      validInput = false;
      if (snakeAlive == false) {
        snakeAlive = true;
        ResetInterval();
      }
      snakeDirection = 1;
      return;
    }
    //input "ArrowDown"
    if (nomTouche === "ArrowDown" && validInput === true) {
      validInput = false;
      // console.log(validInput);
      if (snakeAlive == false) {
        snakeAlive = true;
        ResetInterval();
      }
      snakeDirection = 3;
      return;
    }
  },
  false
);
// console.log(validInput);
//récupération input clavier
document.addEventListener(
  "keyup",
  (event) => {
    const nomTouche = event.key;
    //attendre relachement de la touche
    if (
      nomTouche === "ArrowDown" ||
      nomTouche === "ArrowUp" ||
      nomTouche === "ArrowLeft" ||
      nomTouche === "ArrowRight"
    ) {
      validInput = true;
      // console.log(validInput);
    }
  },
  false
);
  function forward(){
    if(snakeAlive == true){
      timeBefore += time;
    }
      let htmlElementsTS = document.querySelectorAll(".timeSpeedrunShow")
      htmlElementsTS.forEach(element => {
        element.remove();
      })
      var NewTimeS = document.createElement('p')
      NewTimeS.classList.add('timeSpeedrunShow')
      document.getElementById('timeContainer').appendChild(NewTimeS);

      if(parseInt(timeBefore) / 100 < 10){
        NewTimeS.textContent = parseInt(timeBefore) + "ms";
      }
    else if(parseInt(timeBefore) / 1000 < 60 && parseInt(timeBefore) / 100 > 10){
      let temporaryDataTimeSec = parseInt(timeBefore / 1000);
      NewTimeS.textContent = temporaryDataTimeSec  + 's ' + parseInt(timeBefore - (temporaryDataTimeSec * 1000)) + "ms";
    }
    else if(parseInt(timeBefore) / 1000 > 60 && parseInt(timeBefore) / 1000 < 3600){
      let temporaryDataTimeSec = parseInt(timeBefore / 1000);
      let temporaryDataTimeMin = parseInt(temporaryDataTimeSec / 60);
      NewTimeS.textContent = temporaryDataTimeMin + "min " + parseInt(temporaryDataTimeSec - (temporaryDataTimeMin * 60)) + 's ' + parseInt(timeBefore - (temporaryDataTimeSec * 1000)) + "ms";
    }
    else if(parseInt(timeBefore) / 1000 > 3600 && parseInt(timeBefore) / 1000 < 86400){
      let temporaryDataTimeSec = parseInt(timeBefore / 1000);
      let temporaryDataTimeMin = parseInt(temporaryDataTimeSec / 60);
      let temporaryDataTimeHours = parseIntparseInt(temporaryDataTimeMin / 60);
      NewTimeS.textContent = temporaryDataTimeHours + "h "+ parseInt(temporaryDataTimeMin - (temporaryDataTimeHours * 60)) + "min " + parseInt(temporaryDataTimeSec - (temporaryDataTimeMin * 60)) + 's ' + parseInt(timeBefore - (temporaryDataTimeSec * 1000)) + "ms";
    }
    else if(parseInt(timeBefore) / 1000 > 86400 && parseInt(timeBefore) / 1000 < 31536000){
      let temporaryDataTimeSec = parseInt(timeBefore / 1000);
      let temporaryDataTimeMin = parseInt(temporaryDataTimeSec / 60);
      let temporaryDataTimeHours = parseInt(temporaryDataTimeMin / 60);
      let temporaryDataTimeDays = parseInt(temporaryDataTimeHours / 24);
      NewTimeS.textContent = temporaryDataTimeDays + "d " + parseInt(temporaryDataTimeHours - (temporaryDataTimeDays * 24)) + "h "+ parseInt(temporaryDataTimeMin - (temporaryDataTimeHours * 60)) + "min " + parseInt(temporaryDataTimeSec - (temporaryDataTimeMin * 60)) + 's ' + parseInt(timeBefore - (temporaryDataTimeSec * 1000)) + "ms";
    }
    else if(parseInt(timeBefore) / 1000 > 31536000){
      let temporaryDataTimeSec = parseInt(timeBefore / 1000);
      let temporaryDataTimeMin = parseInt(temporaryDataTimeSec / 60);
      let temporaryDataTimeHours = parseInt(temporaryDataTimeMin / 60);
      let temporaryDataTimeDays = parseInt(temporaryDataTimeHours / 24);
      let temporaryDataTimeYears = parseInt(temporaryDataTimeDays / 365);
      NewTimeS.textContent = temporaryDataTimeYears + "y" + parseInt(temporaryDataTimeDays - (temporaryDataTimeYears * 365)) + "d " + parseInt(temporaryDataTimeHours - (temporaryDataTimeDays * 24)) + "h "+ parseInt(temporaryDataTimeMin - (temporaryDataTimeHours * 60)) + "min " + parseInt(temporaryDataTimeSec - (temporaryDataTimeMin * 60)) + 's ' + parseInt(timeBefore - (temporaryDataTimeSec * 1000)) + "ms";
    }

    if (snakeAlive == true) {
      //Move data
      if (positionHistoryX[0] == appleX && positionHistoryY[0] == appleY) {
        longPositionHistory++;
        GenNewApple();
      }
      for(let i = 1; i < positionHistoryX.length; i++){
        if(positionHistoryX[i] == positionHistoryX[0] && positionHistoryY[i] == positionHistoryY[0]){
         die();
        }
      }

      for (let i = longPositionHistory; i >= 0; i--) {
        positionHistoryX[i + 1] = positionHistoryX[i];
        positionHistoryY[i + 1] = positionHistoryY[i];
      }

      //Move data of #head
      positionHistoryX[1] = positionHistoryX[0];
      positionHistoryY[1] = positionHistoryY[0];
      //Add new data for #head

      //Move
      if (snakeDirection == 1) {
        positionHistoryX[0]--;
      } else if (snakeDirection == 3) {
        positionHistoryX[0]++;
      } else if (snakeDirection == 2) {
        positionHistoryY[0]++;
      } else if (snakeDirection == 4) {
        positionHistoryY[0]--;
      }
      
      
      //Check Snake is not outside
      if (positionHistoryX[0] > 24 || positionHistoryY[0] > 24 || positionHistoryX[0] < 0 || positionHistoryY[0] < 0) {
        die();
      }
      
      

      //Show apple collected
      let htmlElementsA = document.querySelectorAll(".AppleCountShow")
      htmlElementsA.forEach(element => {
        element.remove();
      })
      var NewTimeA = document.createElement('p')
      NewTimeA.classList.add('AppleCountShow')
      document.getElementById('AppleCount').appendChild(NewTimeA);
      if(parseInt(positionHistoryX.length - 4) >= 1){
        NewTimeA.textContent = "Apple collected : " + parseInt(positionHistoryX.length - 4)
      }
      //Check apple coordinate
      if (positionHistoryX[0] == appleX && positionHistoryY[0] == appleY) {
        longPositionHistory++;
        GenNewApple();
        NewBody();
        if(time > 150){
          time /= 1.1
        }
        else if(time > 100){
          time /= 1.05
        }
        else if(time > 75){
          time /= 1.01
        }
        else if(time < 75){
          time /= 1.005
        }
        else{
          console.error("IMPOSIBLE VALLUE FOR <<time>> : " + time);
          time = 300
        }
        ResetInterval();
      }
      
        moveHTML();
      
      
    }
  }

//Create apple coordinate
function GenNewApple() {
  for (let i = 0; i < positionHistoryX.length; i++) {
    appleX = Math.floor(25 * Math.random());
    appleY = Math.floor(25 * Math.random());
    while (appleX == positionHistoryX[i] && appleY == positionHistoryY[i]) {
        appleX = Math.floor(25 * Math.random());
        appleY = Math.floor(25 * Math.random());
    }
  }

  let appleHTML = document.getElementById("Apple")
  appleHTML.style.top = appleX * 20 + 40 + 'px';
  appleHTML.style.left = appleY * 20 + 40 + 'px';
}

function getHTMLelements(){
  htmlElements = document.querySelectorAll(".snakeBody")
}



function moveHTML(){
    htmlElements.forEach((element,index) => {
        element.style.top = positionHistoryX[index] * 20  + 40 + 'px';
        element.style.left = positionHistoryY[index] * 20  + 40 + 'px';
      })
}




function NewBody(){
  
  htmlElements = document.querySelectorAll(".snakeBody")
  while(htmlElements.length < positionHistoryX.length){
      console.log(htmlElements.length)
      var newSnakeBody = document.createElement('div')
      newSnakeBody.classList.add('snakeBody')
      document.getElementById('container').appendChild(newSnakeBody);
      if(document.querySelectorAll("#head")== null){
        newSnakeBody.id = head
      }
      htmlElements = document.querySelectorAll(".snakeBody")
  }
  
  }

  function die(){
    snakeAlive = false;
    if(parseInt(timeBefore / 100) < 10){
      alert("------------------------------ You are die ------------------------------\nYou survived " + parseInt(timeBefore) + "ms\nNumber of apple collected : " + parseInt(positionHistoryX.length - 4) + "\nSnake tail : " + positionHistoryX.length + "\n--------------------------------------------------------------------------");
    }
    else if(parseInt(timeBefore / 1000) < 60 && parseInt(timeBefore / 100) >= 10){
      let sec = parseInt(timeBefore / 1000);
      alert("------------------------------ You are die ------------------------------\nYou survived " + parseInt(sec) + "s " + parseInt(timeBefore - (sec * 1000)) + "ms\nNumber of apple collected : " + parseInt(positionHistoryX.length - 4) + "\nSnake tail : " + positionHistoryX.length + "\n--------------------------------------------------------------------------");
    }
    else if(timeBefore / 1000 >= 60 && timeBefore / 1000 < 3600){
      let sec = parseInt(timeBefore / 1000)
      let min = parseInt(sec / 60)
      alert("------------------------------ You are die ------------------------------\nYou survived " + parseInt(min) + "min " + parseInt(sec - (min * 60)) + "s " + parseInt(timeBefore - (sec * 1000)) +"ms\nNombre de pomme récolter : " + parseInt(positionHistoryX.length - 4) + "\nSnake tail : " + positionHistoryX.length + "\n--------------------------------------------------------------------------");
    }
    else if(parseInt(timeBefore / 1000) >= 3600 && parseInt(timeBefore / 1000) < 86400){
      let sec = parseInt(timeBefore / 1000)
      let min = parseInt(sec / 60)
      let hour = parseInt(min / 60)
      alert("------------------------------ You are die ------------------------------\nYou survived " + parseInt(hour) + "h" + parseInt(min - (hour * 60)) + "min " + parseInt(sec - (min * 60)) + "s " + parseInt(timeBefore - (sec * 1000)) + "ms\nNombre de pomme récolter : " + parseInt(positionHistoryX.length - 4) + "\nSnake tail : " + positionHistoryX.length + "\n--------------------------------------------------------------------------");
    }
    else if(timeBefore / 1000 >= 86400 && timeBefore / 1000 < 31536000){
      let sec = parseInt(timeBefore / 1000)
      let min = parseInt(sec / 60)
      let hour = parseInt(min / 60)
      let day = parseInt(min / 24)
      alert("------------------------------ You are die ------------------------------\nYou survived " + parseInt(day) + "d " + parseInt(hour - (day * 24)) + "h" + parseInt(min - (hour * 60)) + "min " + parseInt(sec - (min * 60)) + "s " + parseInt(timeBefore - (sec * 1000)) +"s\nNumber of apple collected : " + parseInt(positionHistoryX.length - 4) + "\nSnake tail : " + positionHistoryX.length + "\n--------------------------------------------------------------------------");
    }
    else if(timeBefore / 1000 >= 31536000){
      let sec = parseInt(timeBefore / 1000)
      let min = parseInt(sec / 60)
      let hour = parseInt(min / 60)
      let day = parseInt(hour / 24)
      let year = parseInt(day / 365)
      alert("------------------------------ You are die ------------------------------\nYou survived " + parseInt(year) + "y " + parseInt(day - (year * 365)) + "d " + parseInt(hour - (day * 24)) + "h" + parseInt(min - (hour * 60)) + "min " + parseInt(sec - (min * 60)) + "s " + parseInt(timeBefore - (sec * 1000)) +"s\nNumber of apple collected : " + parseInt(positionHistoryX.length - 4) + "\nSnake tail : " + positionHistoryX.length + "\n--------------------------------------------------------------------------");
    }
    positionHistoryY = [12,11, 10];
    positionHistoryX = [12,12,12];
    longPositionHistory = 2;
    snakeDirection = 2;
    time = 300
    timeBefore = 0;
    tryBefore++;
    let headCount = true
    htmlElements.forEach(element => {
      if(headCount == false){
        element.remove(); 
      }
      else if(headCount == true){
        headCount = false
      }
      
    });

    NewBody();
  }


   
    
   function ResetInterval(){
    if(forwardInterval == null){
     forwardInterval = setInterval(forward, time);
    }
    else{
      clearInterval(forwardInterval);
      forwardInterval = null;
      ResetInterval();
      
    }
    
    }

    function visualBackgroundSetup(){
    var positionBackgroundX = 0
      var positionBackgroundY = 0
      var positionBackgroundZ = 0
      var positionBackground0 = true
      for(let i = 313; i > 0; i--){
        var NewBackground = document.createElement('div')
        NewBackground.classList.add('backgroundsSquare')
        document.getElementById('backgroundContainer').appendChild(NewBackground);
      }

      htmlElementsForBackground = document.querySelectorAll(".backgroundsSquare")
      htmlElementsForBackground.forEach((element,index) => {
        element.style.top = positionBackgroundX * 20  + 40 + 'px';
        element.style.left = positionBackgroundY * 20  + 40 + 'px';
        if(positionBackgroundZ < 12){
          positionBackgroundY += 2
          positionBackgroundZ += 1
        }
      else if(positionBackground0 == true){
        positionBackgroundZ = 1
        positionBackgroundY = 1
        positionBackgroundX += 1
        positionBackground0 = false
      }
      else if(positionBackground0 == false){
        positionBackgroundZ = 0
        positionBackgroundY = 0
        positionBackgroundX += 1
        positionBackground0 = true
      }
      else{
        console.error("IMPOSIBLE VALUE FOR <<positionBackgroundZ>> : " + positionBackgroundZ);
      }
      })
  }