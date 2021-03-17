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
var cardBankLength = 100;

var playerCards = [];
var enemyCards = [];

//cards will be:
// 0. attack - number 
// 1. health - number
// 2. name = string
// 3. picture - string
// 4. color - string
// 5. inplay? - boolean 
// [[1, 2][3, 4][5, 6]]

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

    initializeCards();
    initializeDisplay();
    console.log(playerCards);
    console.log(enemyCards);
}

function initializeDisplay() {
    var cards = document.getElementsByClassName('card');
    var namesDisp = document.getElementsByClassName('creature-name');
    var attacksDisp = document.getElementsByClassName('creature-attack');
    var defenseDisp = document.getElementsByClassName('creature-defense');

    for (var i = 0; i < 6; i ++) {
        if( i < 3) {
        attacksDisp[i].innerHTML = playerCards[i][0];
        defenseDisp[i].innerHTML = playerCards[i][1];
        namesDisp[i].innerHTML = playerCards[i][2];
        cards[i].style.backgroundColor = playerCards[i][3];
        }
        else {
        attacksDisp[i].innerHTML = enemyCards[i-3][0];
        defenseDisp[i].innerHTML = enemyCards[i-3][1];
        namesDisp[i].innerHTML = enemyCards[i-3][2];
        cards[i].style.backgroundColor = enemyCards[i-3][3];
        //background-color: #456aff50;
        }  
    }

}

function initializeCards(){
    for (var i = 0; i < cardBankLength; i ++)
    {
        var cardInfo = getRandomStats();

        if (i % 2 == 0) {
            cardInfo.push(getRandomName());
            cardInfo.push(getRandomColor());
            playerCards.push(cardInfo);

        }
        else {
            cardInfo.push(getRandomName());
            cardInfo.push(getRandomColor());
            enemyCards.push(cardInfo);
        }

    }
}

function getRandomStats() {
    var ret = [];

    var attack = parseInt(Math.random() * 6 + 4);
    var defense = parseInt(Math.random() * 8 + 8);
    ret.push(attack);
    ret.push(defense);
    return ret;
}

function getRandomColor() {
    var colors = '123456789abcdef';
    var ret = '#';

    for (var i = 0; i < 6; i++) {
        ret += colors.charAt(parseInt(Math.random() * colors.length));
    }
    ret += '50';
    return ret;
}
function getRandomName() {
    var vowels = 'aeiou';
    var consonants = 'qwrtypsdfghjklzxcvbnm';
    var length = parseInt(Math.random() * 3 + 3);
    var ret = '';

    if (length % 2 == 0) {
        ret += vowels.charAt(parseInt(Math.random() * vowels.length));
    }
    for (var i = 0; i < length; i++) {
        ret += consonants.charAt(parseInt(Math.random() * consonants.length));
        ret += vowels.charAt(parseInt(Math.random() * vowels.length));
    }

    vowels.charAt()
    return ret;
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