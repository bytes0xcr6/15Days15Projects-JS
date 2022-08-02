const inputNum = document.getElementById("input-num");
const etherToGwei = document.getElementById("etherToGwei");
const etherToWei = document.getElementById("etherToWei");

inputNum.addEventListener("keypress", function (e) {
  let value = inputNum.value;

  if (e.key == `Enter`) {
    if (value < 0) {
      alert(`Add a number greater than 0`);
    } else {
      etherToGwei.textContent = value * 1000000000;
      etherToWei.textContent = value * 1000000000000000000;
    }
  }
});

btn.addEventListener("click", function () {
  inputNum.value = 0;
});
