let resultH = 0;
let resultG = 0;
let homeScore = document.getElementById("home-score");
let guestScore = document.getElementById("guest-score");

function addOneH() {
  resultH += 1;
  homeScore.textContent = resultH;
}
function addOneG() {
  resultG += 1;
  guestScore.textContent = resultG;
}

function addTwoH() {
  resultH += 2;
  homeScore.textContent = resultH;
}

function addTwoG() {
  resultG += 2;
  guestScore.textContent = resultG;
}
function addThreeH() {
  resultH += 3;
  homeScore.textContent = resultH;
}

function addThreeG() {
  resultG += 3;
  guestScore.textContent = resultG;
}
