let img, mas;
let spanR, spanB, spanU;
let redBall;
let blueBall;
let user_id;

  redBall = document.getElementById("ballred");
  blueBall = document.getElementById("ballblue");
  spanR = document.getElementById("redBallCount");
  spanB = document.getElementById("blueBallCount");
  spanU = document.getElementById("user");
  mas = document.cookie.split(';');
  if(mas && mas.length >=3){
    Main();
  }else{
    fetch('createNewUser.php')
    .then(response => response.json())
    .then(json => {
      user_id=json;
      document.cookie = "user_id="+json;
      Main();
    })
  }

function Main(){
  let rand = randomInteger(0, 1);

  user_id =getCookie("user_id")
  spanU.textContent ="текущий пользователь : user"+user_id;
  
  let userRedBall = getCookie("userRedBall")
  let userBlueBall =getCookie("userBlueBall")
  if(isNaN(userRedBall) || userRedBall == undefined) userRedBall = 0;
  if(isNaN(userBlueBall) || userBlueBall == undefined) userBlueBall = 0;
  if(rand == 0){
    blueBall.setAttribute("hidden", "")
    redBall.removeAttribute("hidden")
    userRedBall++
  }else{
    redBall.setAttribute("hidden", "")
    blueBall.removeAttribute("hidden")
    userBlueBall++
  }
  document.cookie = "userRedBall="+userRedBall;
  document.cookie = "userBlueBall="+userBlueBall;
  console.log(document.cookie);
  fetch('updateAndSelect.php', {
    method: 'POST',
    body: JSON.stringify({
      id: user_id,
      redball: userRedBall,
      blueball: userBlueBall,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      let Allred=0;
      let Allblue=0;
      for(let i=0;i<json.length;i++){
        Allred += +json[i].redball
        Allblue += +json[i].blueball
      }
      spanB.textContent = Allblue;
      spanR.textContent = Allred;
    });
}
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}