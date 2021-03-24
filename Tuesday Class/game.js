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
var cards;
var namesDisp;
var attacksDisp;
var defenseDisp;

//cards will be:
// 0. attack - number 
// 1. health - number
// 2. name = string
// 3. color - string
// 4. picture - string
// 5. alive? - boolean 
// [[1, 2][3, 4][5, 6]]

//display
var playerHealthDisp = document.getElementById('playerHealth');
var enemyHealthDisp = document.getElementById('enemyHealth');
var infoDisp = document.getElementById('info');


//buttons and listeners 
const doneButton = document.getElementById('done');
doneButton.addEventListener('click', play);
const upgradeButton = document.getElementById('upgrade');
upgradeButton.addEventListener('click', upgrade);
const attackButton = document.getElementById('attack');
attackButton.addEventListener('click', cardBattle);

function cardBattle() {
    if (!gameOver()) {

    
    for (var i = 0; i<3; i++) {
        //both cards are alive (i.e. have defense left)

        if (playerCards[i][1] > 0 && enemyCards[i][1] > 0) 
        {
            battle(i);
        }
        //player card is alive, enemy card is dead = subtract from enemy health
        if (playerCards[i][1] > 0 && enemyCards[i][1] <= 0) {
            enemyHealth -= playerCards[i][0];
        }
        //enemy card is alive, player card is dead = subtract from player health

        if (enemyCards[i][1] > 0 && playerCards[i][1] <= 0) {
            playerHealth -= enemyCards[i][0];
        }
    }
    initializeDisplay();
    updateDisp();
}
gameOver();
}

function battle(i) {
    console.log("before battle player card of " + i + " is: " + playerCards[i][1]);
    console.log("before battle enemy card health of " + i + " is: " + enemyCards[i][1]);

    playerCards[i][1] -= enemyCards[i][0];
    enemyCards[i][1] -= playerCards[i][0];
    console.log("player card health is: " + playerCards[i][1]);
    if (playerCards[i][1]<= 0) {
        cardDeath(playerCards, i);
    }
    console.log("enemy card health is: " + enemyCards[i][1]);

    if (enemyCards[i][1]<= 0) {
        cardDeath(enemyCards, i);
    }
}

function cardDeath(cardArray, i) {
    cardArray[i][5] = 0;
}
function upgrade(){

}

function play() {
    attackButton.disabled = false;
    upgradeButton.disabled = false;

    initializeCards();
    initializeDisplay();
    console.log(playerCards);
    console.log(enemyCards);
    doneButton.innerHTML = 'Done';
    doneButton.removeEventListener('click', play);
    doneButton.addEventListener('click', playerTurnOver)
}

function playerTurnOver() {
console.log('player turn over');
}



function initializeDisplay() {
    cards = document.getElementsByClassName('card');
    namesDisp = document.getElementsByClassName('creature-name');
    attacksDisp = document.getElementsByClassName('creature-attack');
    defenseDisp = document.getElementsByClassName('creature-defense');
    imageDisp = document.getElementsByTagName('img');

    for (var i = 0; i < 6; i ++) {
        if( i < 3) {
        attacksDisp[i].innerHTML = "Attack: " + playerCards[i][0];
        defenseDisp[i].innerHTML = "Defense: " + playerCards[i][1];
        namesDisp[i].innerHTML = playerCards[i][2];
        cards[i].style.backgroundColor = playerCards[i][3];
        if (playerCards[i][5] == 0) {
            cards[i].style.backgroundColor = "#000";
        }
        imageDisp[i].src = playerCards[i][4];
        }
        else {
        attacksDisp[i].innerHTML = "Attack: " + enemyCards[i-3][0];
        defenseDisp[i].innerHTML = "Defense: " + enemyCards[i-3][1];
        namesDisp[i].innerHTML = enemyCards[i-3][2];
        cards[i].style.backgroundColor = enemyCards[i-3][3];
        if (enemyCards[i-3][5] == 0) {
            cards[i].style.backgroundColor = "#000";
        }
        imageDisp[i].src = enemyCards[i-3][4];
        }  
    }

}

function getRandomImageURL() {
    ret = "https://picsum.photos/id/";
    ret += parseInt(Math.random() * 100 + 200);
    ret += "/200";
    return ret;
}

function initializeCards(){
    for (var i = 0; i < cardBankLength; i ++)
    {
        //0,1
        var cardInfo = getRandomStats();
        cardInfo.push(getRandomName());
        cardInfo.push(getRandomColor());
        cardInfo.push(getRandomImageURL());
        cardInfo.push(1);
        //[[1,2,'name','color, 'url', alive? - initially set to 1]. [1,2,'name','color, 'url', alive?]]

        if (i % 2 == 0) {
            playerCards.push(cardInfo);
        }
        else {
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