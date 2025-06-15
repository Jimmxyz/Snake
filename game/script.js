//A game by @Jimmxyz on github : https://github.com/Jimmxyz
//This project is under MIT license

//Variable
let validInput = true;
let snakeAlive = false;
let snakeDirection = 2;
let longPositionHistory = 1;
let positionHistoryY = [10,9,8];
let positionHistoryX = [9,9,9];
let appleX = 12;
let appleY = 12;
let time = 300;
let forwardInterval;
let appleColected = 0;
let lastMove = 4;

//Touch function
let initialX = null;
let initialY = null;

function backToHome(){
  window.location.replace("../index.html");
}

function init(){
    document.getElementById('game_area').innerHTML = ""
    for(let i = 0; i < 20; i++){
        const div = document.createElement('div');
        div.className = "col";
        div.id = "COL" + i;
        document.getElementById("game_area").appendChild(div);
        for(let j = 0; j < 20; j++){
            const div = document.createElement('div');
            if(j % 2 === i % 2){
              div.className = "Dcell";  
            }
            else{
              div.className = "Lcell";
            }
            div.id = "COL" + i + "CELL" + j;
            document.getElementById("COL" + i).appendChild(div);
        }   
    }
    console.log("Game grid displayed");
    if(localStorage.getItem("HIGH_SCORE") === null){
      localStorage.setItem("HIGH_SCORE",0)
    }
    document.getElementById('hig').innerText = String(localStorage.getItem("HIGH_SCORE")) + " apple"
    document.getElementById('hig_mob').innerText = String(localStorage.getItem("HIGH_SCORE")) + " apple"
    for (let i = longPositionHistory + 1; i > 0; i--) {
        document.getElementById('COL' + positionHistoryY[i] + "CELL" + positionHistoryX[i]).style.backgroundColor = "rgb(157, 157, 225)";
    }
    document.getElementById('COL' + positionHistoryY[0] + "CELL" + positionHistoryX[0]).style.backgroundColor = "rgb(115, 115, 185)";
}


function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
};

function moveTouch(e) {
    e.preventDefault();
    if (initialX === null || initialY === null ) {
        return;
    }

    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;

    let diffX = initialX - currentX;
    let diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0 && lastMove !== 4) {
            // swiped left
            if (snakeAlive == false) {
              snakeAlive = true;
              ResetInterval();
            }
            snakeDirection = 4;
        } else if (lastMove !== 2) {
            // swiped right
            if (snakeAlive == false) {
              snakeAlive = true;
              ResetInterval();
            }
            snakeDirection = 2;
        }
    } else {
        // sliding vertically
        if (diffY > 0 && lastMove !== 1) {
            // swiped up
            if (snakeAlive == false) {
              snakeAlive = true;
              ResetInterval();
            }
            snakeDirection = 1;
        } else if(lastMove !== 3){
            // swiped down
            if (snakeAlive == false) {
              snakeAlive = true;
              ResetInterval();
            }
            snakeDirection = 3;
        }
    }

    initialX = null;
    initialY = null;
};

document.addEventListener("touchstart", startTouch, false);
document.addEventListener("touchmove", moveTouch,{passive: false});

document.addEventListener('DOMContentLoaded', () => {
  init();
  GenNewApple();
})  


//Get keyboard input
document.addEventListener(
  "keydown",
  (event) => {
    const keyName = event.key;
    //input "ArrowRight" 
    if ((keyName === "ArrowRight" || keyName === "d" || keyName === "D")  && validInput === true && lastMove !== 2) {
      validInput = false;
      if (snakeAlive == false) {
        snakeAlive = true;
        ResetInterval();
      }
      snakeDirection = 2;
      return;
    }
    //input "ArrowLeft"
    if ((keyName === "ArrowLeft" || keyName === "a" || keyName === "A") && validInput === true && lastMove !== 4) {
      validInput = false;
      if (snakeAlive == false) {
        snakeAlive = true;
        ResetInterval();
      }
      snakeDirection = 4;
      return;
    }
    //input "ArrowUp"
    if ((keyName === "ArrowUp" || keyName === "w" || keyName === "W") && validInput === true && lastMove !== 1) {
      validInput = false;
      if (snakeAlive == false) {
        snakeAlive = true;
        ResetInterval();
      }
      snakeDirection = 1;
      return;
    }
    //input "ArrowDown"
    if ((keyName === "ArrowDown" || keyName === "d" || keyName === "D") && validInput === true && lastMove !== 3) {
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
    const keyName = event.key;
    //attendre relachement de la touche
    if (
      keyName === "ArrowDown" ||
      keyName === "ArrowUp" ||
      keyName === "ArrowLeft" ||
      keyName === "ArrowRight" || 
      keyName === "d" || 
      keyName === "D" || 
      keyName === "s" || 
      keyName === "S" ||
      keyName === "a" ||
      keyName === "A" ||
      keyName === "w" ||
      keyName === "W" 
    ) {
      validInput = true;
      // console.log(validInput);
    }
  },
  false
);

//Create apple coordinate
function GenNewApple() {
  appleX = Math.floor(20 * Math.random());
  appleY = Math.floor(20 * Math.random());
  while (document.getElementById("COL" + appleY + "CELL" + appleX).style.backgroundColor === "rgb(115, 115, 185)" || document.getElementById("COL" + appleY + "CELL" + appleX).style.backgroundColor === "rgb(115, 115, 185)") {
      appleX = Math.floor(20 * Math.random());
      appleY = Math.floor(20 * Math.random());
  }
  document.getElementById("COL" + appleY + "CELL" + appleX).style.backgroundColor = "rgb(241, 109, 109)"
}



  function die(){
    snakeAlive = false;
    if(localStorage.getItem("HIGH_SCORE") < appleColected){
      localStorage.setItem("HIGH_SCORE", appleColected)
    }
    localStorage.setItem("SCORE",appleColected)
    window.location.replace("./gameOver.html");
  }













function forward(){
  document.getElementById('tuto').style.display = "none";
  if (snakeAlive == true) {
      //Snake renderer part 1 (remove)
      document.getElementById('COL' + positionHistoryY[positionHistoryY.length - 1] + 'CELL' + positionHistoryX[positionHistoryY.length - 1]).style.backgroundColor = ""
      //Move data
      for(let i = 1; i < positionHistoryX.length; i++){
        if(positionHistoryX[i] == positionHistoryX[0] && positionHistoryY[i] == positionHistoryY[0]){
         die();
        }
      }
      for (let i = longPositionHistory; i >= 0; i--) {
        positionHistoryX[i + 1] = positionHistoryX[i];
        positionHistoryY[i + 1] = positionHistoryY[i];
      }

      
      positionHistoryX[1] = positionHistoryX[0];
      positionHistoryY[1] = positionHistoryY[0];
      

      //Move
      if (snakeDirection == 1) {
        positionHistoryX[0]--;
        lastMove = 3
      } else if (snakeDirection == 3) {
        positionHistoryX[0]++;
        lastMove = 1
      } else if (snakeDirection == 2) {
        positionHistoryY[0]++;
        lastMove = 4
      } else if (snakeDirection == 4) {
        positionHistoryY[0]--;
        lastMove = 2
      }


      //Check Snake is not outside
      if (positionHistoryX[0] > 19 || positionHistoryY[0] > 19 || positionHistoryX[0] < 0 || positionHistoryY[0] < 0) {
        die();
        return
      }
      //Check apple coordinate
      if (positionHistoryX[0] == appleX && positionHistoryY[0] == appleY) {
        appleColected++;
        document.getElementById('act').innerText = appleColected + " apple"
        document.getElementById('act_mob').innerText = appleColected + " apple"
        longPositionHistory++;
        document.getElementById('COL' + appleY + "CELL" + appleX).style.backgroundColor = ""
        //Snake renderer part 2 (refresh and add)
        for (let i = longPositionHistory; i > 0; i--) {
          document.getElementById('COL' + positionHistoryY[i] + "CELL" + positionHistoryX[i]).style.backgroundColor = "rgb(157, 157, 225)";
        }
        document.getElementById('COL' + positionHistoryY[0] + "CELL" + positionHistoryX[0]).style.backgroundColor = "rgb(115, 115, 185)";
        GenNewApple();
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
      else{
      //Snake renderer part 2 (refresh and add)
      for (let i = longPositionHistory + 1; i > 0; i--) {
        document.getElementById('COL' + positionHistoryY[i] + "CELL" + positionHistoryX[i]).style.backgroundColor = "rgb(157, 157, 225)";
      }
        document.getElementById('COL' + positionHistoryY[0] + "CELL" + positionHistoryX[0]).style.backgroundColor = "rgb(115, 115, 185)";
      }
    }
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

//Controller support
window.addEventListener("gamepadconnected", function(e) {
  var gp = navigator.getGamepads()[e.gamepad.index];
  console.log("Contrôleur connecté, index : %d, id: %s", gp.index, gp.id);
});
window.addEventListener("gamepaddisconnected", function(e) {
  console.log("Contrôleur déconnecté du port %d", e.gamepad.index);
});
setInterval(function() {
  var gamepads = navigator.getGamepads();
  for (var i = 0; i < gamepads.length; i++) {
    var gp = gamepads[i];
      if (gp) {
        var axeX = gp.axes[0];
        var axeY = gp.axes[1];
        if (axeX.toFixed(1) == -1) { validInput = false;
      if (snakeAlive == false) {
        snakeAlive = true;
        ResetInterval();
      }
      snakeDirection = 4;}
        else if (axeX.toFixed(1) == 1) { validInput = false;
      if (snakeAlive == false) {
        snakeAlive = true;
        ResetInterval();
      }
      snakeDirection = 2; }
        if (axeY.toFixed(1) == -1) { if (snakeAlive == false) {
        snakeAlive = true;
        ResetInterval();
      }
      snakeDirection = 1; }
        else if (axeY.toFixed(1) == 1) { 
          if (snakeAlive == false) {
                  snakeAlive = true;
                  ResetInterval();
                }
                snakeDirection = 3;
        }
        gp.buttons.forEach(() =>function(button, index) {
          if (button.pressed) {
            console.log("Bouton pressé sur le contrôleur %d: bouton %d", gp.index, index);
            if(index === 14){
               validInput = false;
      if (snakeAlive == false) {
        snakeAlive = true;
        ResetInterval();
      }
      snakeDirection = 4;
            }
            else if(index === 13){
              //Down  
              if (snakeAlive == false) {
                  snakeAlive = true;
                  ResetInterval();
                }
                snakeDirection = 3;
            }
            else if(index === 12){
                if (snakeAlive == false) {
        snakeAlive = true;
        ResetInterval();
      }
      snakeDirection = 1;
            }
            else if(index === 15){
                      snakeDirection = 2; }

            }
            else if(index === 0){
                //confirm
            }
          }
        );
      }
    }
  }, 100);