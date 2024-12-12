let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    loses: 0,
    ties: 0,
  };


  let isAutoPlaying = false;
  let intervalId;
  document.querySelector(".autoplayButton").addEventListener('click', ()=>{
    autoPlay();
  });

  function autoPlay(){
    if(!isAutoPlaying){
      intervalId = setInterval(() => {
        const playerMove = clickComputerMove();
        playGame(playerMove);
      }, 1000)
      document.querySelector('.autoplayButton').innerText = 'Stop Play';
      isAutoPlaying = true;
    }
    else{
      document.querySelector('.autoplayButton').innerText = 'Auto Play';
      clearInterval(intervalId);
      isAutoPlaying=false;
    }
  }

  document.querySelector(".rockButton").addEventListener("click", ()=>{
    playGame('Rock');
  });

  document.querySelector(".paperButton").addEventListener('click', ()=>{
    playGame("Paper");
  });

  document.querySelector(".scissorButton").addEventListener('click', ()=>{
    playGame("Scissor");
  });

  document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
      playGame('Rock');
    }
    else if(event.key==='p'){
      playGame('Paper');
    }
    else if(event.key==='s'){
      playGame('Scissor');
    }
  });



  updateScore();

  function playGame(playerMove) {
    let result = "";
    const computerMove = clickComputerMove();

    if (playerMove === "Rock") {
      if (computerMove === "Rock") {
        result = "Tie";
      } else if (computerMove === "Paper") {
        result = "You Lose";
      } else if (computerMove === "Scissor") {
        result = "You Win";
      }
    } else if (playerMove === "Paper") {
      if (computerMove === "Rock") {
        result = "You Win";
      } else if (computerMove === "Paper") {
        result = "Tie";
      } else if (computerMove === "Scissor") {
        result = "You Lose";
      }
    } else if (playerMove === "Scissor") {
      if (computerMove === "Rock") {
        result = "You Lose";
      } else if (computerMove === "Paper") {
        result = "You Win";
      } else if (computerMove === "Scissor") {
        result = "Tie";
      }
    }

    if (result === "You Win") {
      score.wins++;
    } else if (result === "You Lose") {
      score.loses++;
    } else if (result === "Tie") {
      score.ties++;
    }

    updateScore();

    document.querySelector(".js-result").innerHTML = `${result}.`;

    document.querySelector(
      ".js-move"
    ).innerHTML = `You <img class="rockButton" src="images/${playerMove}.png" alt="">  <img class="rockButton" src="images/${computerMove}.png" alt=""> Computer`;

    /*alert(You picked ${playerMove}. Computer picked ${computerMove}. ${result}.
Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties});*/
  }
  function updateScore() {
    document.querySelector(
      ".js-score"
    ).innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties};`
    localStorage.setItem("score", JSON.stringify(score));
  }

  function clickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = "";
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = "Rock";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = "Paper";
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = "Scissor";
    }
    return computerMove;
  }