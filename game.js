/* TODO:
1. variables for player health/enemy health
2. variables for cards, and card stats
3. display variables that allow us to change the page
4. add on click listeners to buttons
    a. have only play game working at first
    b. have attack and enemy turn buttons working
5. game logic
*/

//game logic
var playerHealth = 50;
var enemyHealth = 50;
var gameInfo = "Play By Clicking Buttons";
var cards = [[]]; 

//display variables
var gameInfoDisp = document.getElementById('info');
var playerHealthDisp = document.getElementById('playerHealth');
var enemyHealthDisp = document.getElementById('enemyHealth');

//event variables
var playerTurnButton = document.getElementById('attackButton');
playerTurnButton.onclick = function() {
    playerTurn()
};
var enemyTurnButton = document.getElementById('enemyButton');
enemyTurnButton.onclick = function() {
    enemyTurn()
};
var startGameButton = document.getElementById('startButton');
startGameButton.onclick = function() {
    startGame()
};


var cards = document.getElementsByClassName('card');
//
function playerTurn(){
    if(!gameOver()) {
    enemyHealth = enemyHealth - 10;
    updateDisp();
    gameOver();
    }
}

function enemyTurn() {
    if(!gameOver()) {
    playerHealth -= 10;
    updateDisp();
    gameOver();
    }
}

function startGame() {
    playerTurnButton.removeAttribute('disabled');
    enemyTurnButton.removeAttribute('disabled');  
}

function updateDisp() {
    playerHealthDisp.innerHTML = "Player Health = " + playerHealth;
    enemyHealthDisp.innerHTML = "Enemy Health = " + enemyHealth;
}

function gameOver() {
    if (playerHealth <= 0) {
        gameInfoDisp.innerHTML = "You Lost, try again?"
        return true;
    }
    else if (enemyHealth <= 0) {
        gameInfoDisp.innerHTML = "YOU WON BOOYAH!!!"
        return true;
    }
    return false;
}
