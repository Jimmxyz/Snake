function tryIT(){
    window.location.replace("../game/game.html");
}
function back(){
    window.location.replace("../index.html");
}

function showIT(){
    document.getElementById('show').style.display = "block"
    document.getElementById('higShow').innerHTML = localStorage.getItem('HIGH_SCORE')
    if(localStorage.getItem('HIGH_SCORE') === null){
      document.getElementById('highScoreShow').style.display = "none";
    }
    if (window.location.hash.indexOf("-") !== -1) {
        result = [window.location.hash.slice(1, window.location.hash.indexOf("-")), window.location.hash.slice(window.location.hash.indexOf("-") + 1)];
        if(parseInt(result[0]).toString().length === 0 || parseInt(result[0]) === NaN || result[1].length === 0){window.location.replace("../index.html");}
        //yes this line is really ugly
        document.getElementById("score").innerHTML = parseInt(result[0])
        document.getElementById("playerName").innerHTML = result[1]
    }
    else{
        window.location.replace("../index.html");
    }
}
function makeIT(){
    document.getElementById('setup').style.display = "block"
}
document.addEventListener('DOMContentLoaded', () => {
  if(window.location.hash[0] === "#") {
    showIT()
  }
  else{
    makeIT()
  }
})  

function previewIT(){
    document.getElementById('previewBTN').style.display = "none"
    document.getElementById('preview').style.display = "block"
    document.getElementById('share').style.display = "inline-block"
    document.getElementById('link').style.display = "block"
    if(localStorage.getItem("HIGH_SCORE") > 0){
        document.getElementById("scorePre").innerHTML = localStorage.getItem("HIGH_SCORE")
        document.getElementById("link").innerHTML = "https://jimmxyz.github.io/Snake/share/share.html#" + localStorage.getItem("HIGH_SCORE") + "-" + document.getElementById('nameArea').value;
    }
    else{
        document.getElementById("scorePre").innerHTML = "0"
        document.getElementById("link").innerHTML = "https://jimmxyz.github.io/Snake/share/share.html#0-" + document.getElementById('nameArea').value;
    }
    document.getElementById("playerNamePre").innerHTML = document.getElementById('nameArea').value;
}

function textVerified(){
    let input = document.getElementById('nameArea').value;
    if(input.length >= 3){
        const regex = /^[\p{L}0-9_]+$/u
        if (regex.test(input)) {
            document.getElementById('errorText').innerHTML = ""
            document.getElementById('previewBTN').style.display = "inline-block"
            return true
        }
        else{
            document.getElementById('errorText').innerHTML = "Only the letter (Madjust or miniscule, accentuate or not), the numbers and underscore are accepted."
            document.getElementById('previewBTN').style.display = "none";
        }
    }
    else{
        document.getElementById('errorText').innerHTML = "Minimum 3 characters"
        document.getElementById('previewBTN').style.display = "none";
    }
    return false
}

document.getElementById('nameArea').addEventListener('blur', function() {
    textVerified()
    document.getElementById('preview').style.display = "none";
    document.getElementById('share').style.display = "none"
    document.getElementById('link').style.display = "none"
});

document.getElementById('nameArea').addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
    document.getElementById('nameArea').blur();
  }
});

function copy(){
    if(localStorage.getItem("HIGH_SCORE") > 0){
        navigator.clipboard.writeText("https://jimmxyz.github.io/Snake/share/share.html#" + localStorage.getItem("HIGH_SCORE") + "-" + document.getElementById('nameArea').value)
    }
    else{
        navigator.clipboard.writeText("https://jimmxyz.github.io/Snake/share/share.html#0-" + document.getElementById('nameArea').value)
    }
    document.getElementById('share').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg> Copied';
}