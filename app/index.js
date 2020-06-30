// ================================
// START YOUR APP HERE
// ================================

// You can delete this code..
setTimeout(function () {
  alert("PRESS START");
}, 500);


const statusGame = document.querySelector(".game-status")
const startBtn = document.querySelector('.start-btn');
const cells = document.querySelectorAll(".cell");

let live = false;  //게임이 off 상태
let turn = true;   // 내 차례
let winner = null;

//console.log(cells);

function winPattern(text) { 
  live = false;   //게임을 off 상태로
  winner = text;  //매개변수를 받아와서 변수에 저장
  statusGame.textContent = `${winner}가 승리!`;
};

function handleGameCondition() { //변수에 각각 x 또는 o 을 저장하고 승리조건과 비김조건을 만든다.
  const top1 = cells[0].classList[2];  //  좌측상단셀에 x또는 o를 찍었을때 해당값((classList[2]) === "X")을 변수top1에 저장
  const top2 = cells[1].classList[2];
  const top3 = cells[2].classList[2];
  const mid1 = cells[3].classList[2];
  const mid2 = cells[4].classList[2];
  const mid3 = cells[5].classList[2];
  const bottom1 = cells[6].classList[2];
  const bottom2 = cells[7].classList[2];
  const bottom3 = cells[8].classList[2];

  //console.log(top1, top2, top3, mid1, mid2, mid3, bottom1, bottom2, bottom3);

  //승리패턴
  if (top1 && top1 === top2 && top1 === top3) {  //만약 top1을 찍었다면 top1과 top2가 일치하고 top1과 top3가 일치한다. 셋다 일치로 true.
    console.log(top1 && top1 === top2 && top1 === top3);
    winPattern(top1);  //winPattern 함수 실행. top1을 매개변수로
  }
  else if (mid1 && mid1 === mid2 && mid1 === mid3) {
    //console.log(mid1 && mid1 === mid2 && mid1 === mid3);
    winPattern(mid1);
  }
  else if (bottom1 && bottom1 === bottom2 && bottom1 === bottom3) {
    winPattern(bottom1);
  }
  else if (top1 && top1 === mid1 && top1 === bottom1) {
    winPattern(top1);
  }
  else if (top2 && top2 === mid2 && top2 === bottom2) {
    winPattern(top2);
  }
  else if (top3 && top3 === mid3 && top3 === bottom3) {
    winPattern(top3);
  }
  else if (top1 && top1 === mid2 && top1 === bottom3) {
    winPattern(top1);
  }
  else if (top3 && top3 === mid2 && top3 === bottom1) {
    winPattern(top3);
  }
  //비김패턴
  else if (top1 && top2 && top3 && mid1 && mid2 && mid3 && bottom1 && bottom2 && bottom3) { //8가지 승리 패턴을 제외한다면 비김은 어느 자리에 위치해도 상관없다.   
    live = false;  //게임오프
    statusGame.textContent = "비겨버렸네ㅠㅠ";
  }

};



function handleReStart() {
  turn = true;  //내차례
  statusGame.textContent = "(ง •̀_•́)ง";
  winner = null;
  for (let i = 0; i < cells.length; i++) {  //기존 classList에 존재하던 "X" , "O" 제거.
    cells[i].classList.remove("X");
    cells[i].classList.remove("O");
  }
  live = true;   //게임 다시 온
};

function handleCellClick(e) {
  console.log(e.target.classList);
  const classL = e.target.classList; // 클릭한 셀의 타겟 노드의 classList를 받아서 변수에 저장.
  const location = classL[1]; // class="cell top-1  classL[1] 
  console.log("location", location); //해당셀의 위치를 확인함. (ex.top-1)

  if (!live || classL[2] === "X" || classL[2] === "O") { // 게임종료 및 classList[2] 자리에 "X"나"O"가 있으면 리턴.(한번 찍은것 그 자리에 계속유지 되기 위함.)
    return;
  }

  if (turn) {                                 //만약 내 차례라면 turn은 true가 되고 내용 안으로 들어감.
    classL.add("X");                          //classList 에 "X" 추가. ex) class="cell top-1 X
    statusGame.textContent = "O차례입니다.";
    handleGameCondition();                    //게임조건 함수 실행.
    turn = !turn;                             //false 값을 넣어주면 O차례가 된다. 내 차례가 아님.
  } else {
    classL.add("O");                          //classList 에 "O" 추가. ex) class="cell top-1 O
    statusGame.textContent = "X차례입니다.";
    handleGameCondition();                    //게임조건 함수 실행. 
    turn = !turn;                             // true 값을 넣어주면 X 차례. 내 차례임.
  }


};

function handleStart() {
  startBtn.removeEventListener("click", handleStart); //startBtn 에 달려있는 이벤트를 제거
  live = true; // 게임온
  startBtn.textContent = "Restart Game";              //버튼 내용을 바꿈
  startBtn.addEventListener("click", handleReStart);  // 버튼 클릭 시 재시작 함수 실행 가능.
};




startBtn.addEventListener('click', handleStart); //스타트버튼 클릭시 handleStart 함수 실행.


for (let i = 0; i < cells.length; i++) {     //node리스트로 이벤트리스너 사용시 for문 이용. 
  cells[i].addEventListener("click", handleCellClick);   //클릭 이벤트 발생 시 handleCellClick 함수 실행.
}















