/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes.
Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost.
After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score
gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row.
After that, it's the next player's turn.
(Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score,
so that they can change the predefined score of 100.
(Hint: you can read that value with the .value property in JavaScript.
This is a good oportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now.
The player looses his current score when one of them is a 1.
(Hint: you will need CSS to position the second dice,
so take a look at the CSS code for the first one.)
*/

var scores, player1, player2, activePlayer, currentCounter, playerCounter;
var gamePlaying, lastDice1, lastDice2, gameScore;

alert(`Welcome to PIG Game 🐷,
First set the game score and start rolling dices !! Or run with 100 default.
The first reachs the game score wins !!
The rules are:
    1 - If the player rolls a 1, they score nothing and next player's turn.
    2 - If the player score a 6 in both dices twice... thats not good !! You loose all.
    3 - If the player rolls any other number, gets and added to current score.
    4 - Once satisfy, chooses 'hold'! Add current score to player score. Next player's turn.`);

init();

function init() {
    scores = [0,0];
    player1 = 0;
    player2 = 1;
    activePlayer = 0;
    currentCounter = 0;
    playerCounter = 0;
    gamePlaying = true;

    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".dice2").style.display = "none";

    document.getElementById(`current-${player1}`).textContent = "0";
    document.getElementById(`current-${player2}`).textContent = "0";
    document.getElementById(`score-${player1}`).textContent = "0";
    document.getElementById(`score-${player2}`).textContent = "0";
    document.getElementById(`name-${player1}`).textContent = "Player 1";
    document.getElementById(`name-${player2}`).textContent = "Player 2";
    document.querySelector(`.player-${player1}-panel`).classList.remove("winner");
    document.querySelector(`.player-${player2}-panel`).classList.remove("winner");
    document.querySelector(`.player-${player1}-panel`).classList.add("active");
    document.querySelector(`.player-${player2}-panel`).classList.remove("active");
};

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        var dice1 = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);

        document.querySelector(".dice1").style.display = "block";
        document.querySelector(".dice2").style.display = "block";

        document.querySelector(".dice1").src = `dice-${dice1}.png`;
        document.querySelector(".dice2").src = `dice-${dice2}.png`;

        var input = document.querySelector(".game-score").value;
        console.log(input);
        if (input) {
            gameScore = input;
        } else {
            gameScore = 100;
        }

        // Add the values to the current counter IF dice is not 1
        if (dice1 !== 1 && dice2 !== 1) {
            currentCounter += dice1 + dice2;
            document.getElementById(`current-${activePlayer}`).innerHTML = currentCounter;
            if (dice1 === 6 && lastDice1 === 6 && dice2 === 6 && lastDice2 === 6) {
                document.getElementById(`current-${activePlayer}`).textContent = "0";
                document.getElementById(`score-${activePlayer}`).textContent = "0";
                nextPlayer();
            }
        } else {
            nextPlayer();
        }

        lastDice1 = dice1;
        lastDice2 = dice2;
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {

        // Add the currentCounter to score[activePlayerIndex]
        scores[activePlayer] += currentCounter;

        document.querySelector(".dice1").style.display = "none";
        document.querySelector(".dice2").style.display = "none";
        document.getElementById(`score-${activePlayer}`).innerHTML = scores[activePlayer];

        // Check if the score hit 100
        if (document.getElementById(`score-${activePlayer}`).textContent >= gameScore) {
            document.getElementById(`name-${activePlayer}`).textContent = "Winner !!"
            document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner");
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    currentCounter = 0;
    lastDice1 = 0;
    lastDice2 = 0;
    document.getElementById(`current-${activePlayer}`).innerHTML = 0;
    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');
}

// New game button
document.querySelector(".btn-new").addEventListener("click", init);











