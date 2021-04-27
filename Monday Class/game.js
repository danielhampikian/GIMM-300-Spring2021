/* TODO:
1. Make the player choose either upgrade or attack like the enemy has to
2. Do something with the code and the appearance i.e. 
   change the data and the visual appearance, of a clicked on card
    a. visual appearance accesed by cards[index].style or cards[index].classList
    b. actual data accessed by playerCards[index][attributeIndex] or enemyCards[index][attributeIndex]
*/

//game logic
var playerHealth = 50;
var enemyHealth = 50;
var gameInfo = "Play By Clicking Buttons";
var cardsBankLength = 100;
var playerCards = [];
var enemyCards = [];

var cardsDamage; 
var cardsDefense;
var cardsName;
var cards;
var cardImage;
var aiInterval;
var turnName;
var initialized = false;


//display variables
var gameInfoDisp = document.getElementById('info');
var playerHealthDisp = document.getElementById('playerHealth');
var enemyHealthDisp = document.getElementById('enemyHealth');

//event variables
const playerTurnButton = document.getElementById('playerTurn');
playerTurnButton.addEventListener('click', playerAttack);

const doneButton = document.getElementById('done');
doneButton.addEventListener('click', done);

const upgradeButton = document.getElementById('play');
upgradeButton.addEventListener('click', upgrade);


function playerAttack() {
    if(!gameOver()) {
    console.log("In player attack");
    cardBattle();
    gameOver();
    }
}


function playerTurn(){
    if(!gameOver()) {
    turnName = "player";
    gameOver();
    }
}
function setUpCardBanks() {
    for (var i = 0; i < cardsBankLength; i++) {

        var cardStats = getRandomStats();
        // [1, 2]
        cardStats.push(getRandomName());
        // [1, 2, 'random name']
        cardStats.push(getRandomColor());
        // [1, 2, 'random name', 'random color']
        cardStats.push(i);
        // [1, 2, 'random name', 'random color', 'enemy_id_3' 'image url', dead? 0 is dead, 1 is alive]

        //our image is in position 5
        cardStats.push(getRandomImageURL());

        cardStats.push(1);
        //console.log("card stats: " + cardStats);
        // [3, 6, 'aoughalkh'];
        if (i < cardsBankLength/2 ) {
            playerCards.push(cardStats);
        }
        else {
            enemyCards.push(cardStats);
            // [[1, 2, 'name'],[1, 2, 'other name']]
        }
    }
}

function getRandomStats() {
    var ret = [];
    var attack = parseInt(Math.random() * 6 + 4);
    var defense = parseInt(Math.random() * 8 + 6);
    ret.push(attack);
    ret.push(defense);
    return ret;
}

function getRandomName() {
    var vowels = 'aeiouy';
    var consonants = 'qwrtpsdfghjklzxcvbnm';
    var length = parseInt(Math.random() * 4 + 4);
    //console.log("Range for name: " + length);
    var ret = "";
    if (length % 2 == 0) {
        ret += vowels.charAt(parseInt(Math.random() * consonants.length));
    }
    for (var i = 0; i < length; i++){
        ret += consonants.charAt(parseInt(Math.random() * consonants.length));
        ret += vowels.charAt(parseInt(Math.random() * vowels.length));
    }
    return ret;
}
function cardBattle() {
    for (var i = 0; i < 3; i++) {
        if (playerCards[i][6] == 1 && enemyCards[i][6] == 1) {
            battle(i);
        }
        else if (playerCards[i][6] == 0 && enemyCards[i][6] == 1) {
            playerHealth -= enemyCards[i][0];
        }
        else if (playerCards[i][6] == 1 && enemyCards[i][6] == 0) {
            enemyHealth -= playerCards[i][0];
        }
        

    }
    updateDisp();
}

function cardDeath(playerEnemy, i) {
    cards = document.getElementsByClassName('card');
    if (playerEnemy == 'player') {
        cards[i+3].style.backgroundColor = "black";
        console.log("player card " + playerCards[i][2] + " is dead");
    }

    if (playerEnemy == 'enemy') {
        cards[i].style.backgroundColor = "black";
        console.log("enemy card " + enemyCards[i][2] + " is dead");

    }
}
function battle(i) {
    //player health loses whatever the enemies attack is:

    playerCards[i][1] -= enemyCards[i][0];
    //enemy health same deal:
    enemyCards[i][1] -= playerCards[i][0];
    initializeCards();
    if (playerCards[i][1] <= 0) {
        playerCards[i][6] = 0; //card is dead
        cardDeath('player', i);
    }
    if (enemyCards[i][1] <= 0) {
        enemyCards[i][6] = 0; //card is dead
        cardDeath('enemy', i);
    }
    
    //console.log("player cards: ", playerCards[i]);
    //console.log("enemy cards: ", enemyCards[i]);

}

function getRandomColor() {
    var colorLetters = "0123456789abcdef";
    var ret = '#';
    for (var i = 0; i < 6; i++){
        ret += colorLetters.charAt(parseInt(Math.random() * colorLetters.length));
    }
    return ret;
}

function initializeCards(){
    //console.log("Calling");
    //Get a list of all the cards damage in play in the game:
    cardsDamage = document.getElementsByClassName('card-attack');
    cardsDefense= document.getElementsByClassName('card-defense');
    cardsName = document.getElementsByClassName('card-name');
    cards = document.getElementsByClassName('card');
    
    cardImage = document.getElementsByTagName('img');
    //enemy card initializiations:
    for (var i = 0; i < 6; i++) {
        //enemy cards: 
        if(i < 3) {
        //set the attack of the enemy card damage by accessing the list and assignting it the value of enemycards at first array first index
        //[[2, 3, 'aadfuaio' ], [2, 3, 'aadfuaio' ], [2, 3, 'aadfuaio' ]]
        cardsDamage[i].innerHTML = "Attack: " + enemyCards[i][0];
        //set the defense
        cardsDefense[i].innerHTML = "Defense: " + enemyCards[i][1];
        //set the name
        cardsName[i].innerHTML = enemyCards[i][2];

        cards[i].style.backgroundColor = enemyCards[i][3];
        
        cards[i].id = "enemyCard" + i;
        cardImage[i].src = enemyCards[i][5];
        }
        //player cards:
        else {

        //set the attack of the enemy card damage by accessing the list at i
        cardsDamage[i].innerHTML = "Attack: " + playerCards[i-3][0];
        //set the defense
        cardsDefense[i].innerHTML = "Defense: " +  playerCards[i-3][1];
        //set the name
        cardsName[i].innerHTML = playerCards[i-3][2];

        cards[i].style.backgroundColor = playerCards[i-3][3];
        cardImage[i].src = playerCards[i-3][5];
        cards[i].id = ("playerCard" + (i-3));
        console.log(cards[i]);
        if (!initialized) {
            cards[i].addEventListener('click', selected);
            }
        }

    }
}
function selected(e) {
    console.log(this);
    console.log(this.id);
    var idx = parseInt(this.id.slice(-1));
    console.log(idx);
    console.log(playerCards[idx]);
}

function getRandomImageURL() {
 
    var ret = "https://picsum.photos/id/";
    var imgID = parseInt(Math.random() * 100) + "/200";
    ret += imgID;
    return ret;
}

function enemyTurn() {
    if(!gameOver()) {
        turnName = "enemy";
        //enemy Turn code here:
        disableAllButtons();
        console.log("enemy went");
        aiInterval = setInterval(thinkingAIDisplay, 1000);
        setTimeout(stopEnemyTurn, 3100);
    gameOver();
    }
}

function stopEnemyTurn() {
    clearInterval(aiInterval);
    if (enemyChoiceNumber < 70) {
        upgrade();
        gameInfoDisp.innerHTML = "Enemy decided to ugrade";
    }
    else {
        cardBattle();
        gameInfoDisp.innerHTML = "Enemy decided to battle";
    }
    enableAllButtons();
}
var enemyChoiceNumber;
function thinkingAIDisplay() {
    enemyChoiceNumber = Math.random() * 100;
    gameInfoDisp.innerHTML = "Enemy is thinking deeply about the meaning of: " + enemyChoiceNumber;
}

function startGame() {
    //set up random stats for all cards:
    console.log("Started game");
    setUpCardBanks();

    //set up cards in play
    initializeCards();
    
    enableAllButtons();
    upgradeButton.removeEventListener('click', startGame);
    upgradeButton.innerHTML = 'Upgrade';
    upgradeButton.addEventListener('click', upgrade);
}
function enableAllButtons() {
    playerTurnButton.disabled = false;
    doneButton.disabled = false;  
    upgradeButton.disabled = false;
}
function disableAllButtonsButDone() {

    playerTurnButton.disabled = true;
    doneButton.disabled = false;  
    upgradeButton.disabled = true;
}
function disableAllButtons() {

    playerTurnButton.disabled = true;
    doneButton.disabled = true;  
    upgradeButton.disabled = true;
}


function upgrade() {
    console.log("Upgrade");
    if (turnName == "player") {
        for (i = 0; i < 3; i++) {
            console.log(playerCards[i][2]);

            playerCards[i][1] += 2;
            console.log(playerCards[i][2]);
        }
    }
    if (turnName == "enemy") {
        for (i = 0; i < 3; i++) {
            enemyCards[i][1] += 2;
        }
    }

}

function done() {
    enemyTurn();
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
