const container = document.querySelector(".container");
const boxs = document.querySelectorAll(".box");
const reset = document.querySelector(".reset");
const newGame = document.querySelector(".newgame");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("p");
const hide = document.querySelector(".hide");

let turnO = true;
let count = 0;

//winning condition

const winpattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//reset function

const resetbtn = () => {
  turnO = true;
  count = 0;
  enableBtns();
};

// sabhi box par loop lga ke "x" or "o" click print larvaya

boxs.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO === true) {
      box.innerHTML = "O";
      box.classList.add("red");
      box.classList.remove("blue");
      turnO = false;
    } else {
      box.innerHTML = "X";
      box.classList.add("blue");
      box.classList.remove("red");
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      draw();
    }
  });
});

// winner banne je baad btn disabke krne je ke iye

const disableBtns = () => {
  for (let box of boxs) {
    box.disabled = true;
  }
};

// reset ka btn dabane ke baad fir se btn enable ho jaate hai or text bhi delete ho jaate hai

const enableBtns = () => {
  for (let box of boxs) {
    box.disabled = false;
    box.innerText = "";
    msgContainer.classList.add("hide");
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

// game draw hone par
const draw = () => {
  msg.innerText = "Game Draw";
  msgContainer.classList.remove("hide");
  msgContainer.scrollIntoView({ behavior: "smooth", block: "center" });
};

// browser par winner show kiya

const showWinner = (winner) => {
  msg.innerText = `Congratulation, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  msgContainer.scrollIntoView({ behavior: "smooth", block: "center" });
  disableBtns();
};

//winner check kiya
const checkWinner = () => {
  for (let pattern of winpattern) {
    let pos1val = boxs[pattern[0]].innerHTML;
    let pos2val = boxs[pattern[1]].innerHTML;
    let pos3val = boxs[pattern[2]].innerHTML;
    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
        return true;
      }
    }
    // let isdraw= [...boxs].every((box)=> box.innerText !=="")
    // if(isdraw){
    //   draw()
    // }
  }
};

reset.addEventListener("click", resetbtn);
newGame.addEventListener("click", resetbtn);
