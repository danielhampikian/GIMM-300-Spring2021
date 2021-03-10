/*
TODO: 
1. variables for enemy/player health, damage, cards
2. functions for detecting either score is 0 or less, subtracting with button press
3. scores go down, see game win/lose message
*/

//game logic
var playerHealth = 50;
var enemyHealth = 50;
var damageRange = 6;
var cards = [[5, 3, 'bob the creature', 'daniel1.jpg', '#aaa', false], [5, 3, 'bob the creature', 'daniel1.jpg', '#aaa', false]];

//cards will be:
// 0. attack - number 
// 1. health - number
// 2. name = string
// 3. picture - string
// 4. color - string
// 5. inplay? - boolean 

//display
var playerHealthDisp = document.getElementById('playerHealth');
var enemyHealthDisp = document.getElementById('enemyHealth');
var infoDisp = document.getElementById('info');

//buttons and listeners 
var playButton = document.getElementById('play');
playButton.onclick = function(){
    play()
};
var playerTurnButton = document.getElementById('playerTurn');
playerTurnButton.onclick = function(){
    playerTurn()
};
var enemyTurnButton = document.getElementById('enemyTurn');
enemyTurnButton.onclick = function(){
    enemyTurn()
};

function play() {
    playerTurnButton.disabled = false;
    enemyTurnButton.disabled = false;
}

function playerTurn() {
    if (!gameOver()) {
    enemyHealth -= parseInt(Math.random() * damageRange + 4); 
    updateDisp();
    console.log("enemy is at: " + enemyHealth);
    }
    gameOver();
    playerTurnButton.disabled = true;
    enemyTurnButton.disabled = false;

}

function enemyTurn() {
    if(!gameOver()) {
    playerHealth -= parseInt(Math.random() * damageRange + 4);
    updateDisp();
    console.log("player is at" + playerHealth);
    }
    gameOver();
    enemyTurnButton.disabled = true;
    playerTurnButton.disabled = false;
}

function updateDisp() {
    playerHealthDisp.innerHTML = "Player Health: " + playerHealth;
    enemyHealthDisp.innerHTML = "Enemy Health: " + enemyHealth;
}

function gameOver() {

    if (enemyHealth <= 0) {
        infoDisp.innerHTML = "You won, bless up!";
        return true;
    }
    if (playerHealth <=0) {
        infoDisp.innerHTML = "You lost, bless down!";
        return true;
    }

    return false;
}