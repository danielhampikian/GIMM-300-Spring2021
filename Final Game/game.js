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
var cardsBankLength = 100;
var playerCards = [];
var enemyCards = [];

var cardsDamage; 
var cardsDefense;
var cardsName;
var cards;
var cardImage;

var playerDone = false;
var initialized = false;
var lastCardID = 0;
var enemyAIInterval;
var highlightChoice = 4;


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
    playerDone = true;
    disableAllButDone();
    }
}


function playerTurn(){
    if(!gameOver() && !playerDone) {
    enableAllButtons();
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

        //this will tell us if the card is in play at position 6:
        
        // the first 3 enemy cards and first 3 player cards are in play (index 0,1,2 and 50, 51, 52)
        if (i < 3) {
            cardStats.push(1);
            console.log('enemy card in play index is: ' + i);

        }
        else if (i >= cardsBankLength/2 && i < (cardsBankLength/2 + 3)) {
            cardStats.push(1);
            console.log('player card in play index is: ' + i);
        }
        else {
            cardStats.push(0);
        }
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

        if (playerCards[lastCardID][6] == 1 && enemyCards[lastCardID][6] == 1) {
            battle(lastCardID);
        }
        else if (playerCards[lastCardID][6] == 0 && enemyCards[lastCardID][6] == 1) {
            playerHealth -= enemyCards[lastCardID][0];
        }
        else if (playerCards[lastCardID][6] == 1 && enemyCards[lastCardID][6] == 0) {
            enemyHealth -= playerCards[lastCardID][0];
        }
        
    updateDisp();
}
function cardBattleEnemy() {
        if (playerCards[highlightChoice][6] == 1 && enemyCards[highlightChoice][6] == 1) {
            battle(highlightChoice);
        }
        else if (playerCards[highlightChoice][6] == 0 && enemyCards[highlightChoice][6] == 1) {
            playerHealth -= enemyCards[highlightChoice][0];
        }
        else if (playerCards[highlightChoice][6] == 1 && enemyCards[highlightChoice][6] == 0) {
            enemyHealth -= playerCards[highlightChoice][0];
        }
        


    updateDisp();
}

function cardDeath(playerEnemy, i) {
    cards = document.getElementsByClassName('card');
    if (playerEnemy == 'player') {
        cards[i+3].style.backgroundColor = "black";
        console.log("player card " + playerCards[i][2] + " is dead");
        playerCards[i][6] = 0; //no longer in play
    }

    if (playerEnemy == 'enemy') {
        cards[i].style.backgroundColor = "black";
        console.log("enemy card " + enemyCards[i][2] + " is dead");
        enemyCards[i][6] = 0; //no longer in play
    }
}
function battle(i) {
    //player health loses whatever the enemies attack is:

    playerCards[i][1] -= enemyCards[i][0];
    //enemy health same deal:
    enemyCards[i][1] -= playerCards[i][0];
    initializeCards();
    if (playerCards[i][1] <= 0) {
        cardDeath('player', i);
    }
    if (enemyCards[i][1] <= 0) {
        cardDeath('enemy', i);
    }
    
    //console.log("player card: ", playerCards[i]);
    //console.log("enemy card: ", enemyCards[i]);

}

function getRandomColor() {
    var colorLetters = "0123456789abcdef";
    var ret = '#';
    for (var i = 0; i < 6; i++){
        ret += colorLetters.charAt(parseInt(Math.random() * colorLetters.length));
    }
    return ret;
}
function cardIsDead(i) {
    var cardDead = false;
    if ((i>=3) && playerCards[i-3][6] == 0)
    {
        console.log("Player card has death value: " +  playerCards[i-3][6]);
        cardDead = true;
    }
    else if ((i < 3) && enemyCards[i][6] == 0){
        cardDead = true;
    }
    return cardDead;
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
        //need to run a check to see if the card is already dead:
        if (!cardIsDead(i)) {

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
        cardImage[i].src = enemyCards[i][5];
        cards[i].id = 'enemyCard' + i;

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
        cards[i].id = 'playerCard' + i;
        if (!initialized) {
            cards[i].addEventListener('click',selectedCard, false);
        }

        }
    }
    else if (cardIsDead(i)){
        cards[i].style.backgroundColor = "black";
        console.log("deteced death of: " + cards[i].id);
    }


    }
}

function disableAllButDone(){
    playerTurnButton.disabled = true;
    doneButton.disabled = false;  
    upgradeButton.disabled = true;
}

function selectedCard(e) {
    console.log(this);
        var idx = parseInt(this.id.slice(-1));
        console.log(this.id.charAt(0));
            if(this.id.charAt(0) == "p") {
            console.log("player card name is: " + playerCards[idx-3][2]);
            console.log("player id is: " + (parseInt(this.id.slice(-1)) -3) );
            }
            //if we ever want to add listeners to the enemy cards later:
            else {
            console.log("Enemy card name is: " + enemyCards[idx][2]);
            }
        lastCardID = parseInt(this.id.slice(-1)-3);
    for (i = 3; i < 6; i++){
    if (cards[i].classList.contains('glow')) {
        cards[i].classList.remove('glow');
    }
    }
    this.classList.toggle("glow");
}

function getRandomImageURL() {
 
    var ret = "https://picsum.photos/id/";
    var imgID = parseInt(Math.random() * 100) + "/200";
    ret += imgID;
    return ret;
}

function enemyTurn() {
    if(!gameOver()) {
    disableAllButtons();
    simulateThinking();
    setTimeout(enemyChoice, 3200);
    gameOver();
    }
}
function enemyChoice() {
    //find a card that is alive:
    for (i = 0; i < 3; i++) {
        if (enemyCards[i][6] == 1) {
    if (highlightChoice < 1  && enemyCards[i][6] == 1) {
        console.log("Enemy Upgraded");
        gameInfoDisp.innerHTML = "Enemy decided to upgrade " + enemyCards[highlightChoice][2]; 
        cards[highlightChoice].style.backgroundColor = "blue";
        enemyCards[highlightChoice][0] += (parseInt(Math.random() * enemyCards[lastCardID][0] + enemyCards[lastCardID][0]/4));
        enemyCards[highlightChoice][1] += (parseInt(Math.random() * enemyCards[lastCardID][1] + enemyCards[lastCardID][1]/4));
        initializeCards();
        cards[highlightChoice].style.backgroundColor = "yellow";
        gameOver();
        return;
    }
    else if (enemyCards[i][6] == 1){
        console.log("Enemy Attacked");
        gameInfoDisp.innerHTML = "Enemy decided to attack with "  + enemyCards[highlightChoice][2]; 
        cards[highlightChoice].style.backgroundColor = "red";
        cardBattleEnemy();
        gameOver();
        return;
    }
}
    }
}
function simulateThinking() {
    enemyAIInterval = setInterval(enemyAI, 500);
    //essentially this makes it player turn again:
    setTimeout(enableAllButtons, 3000);
}
function enemyAI() {
    //first 3 cards are enemy cards
    highlightChoice = parseInt(Math.random() * 3);
    cards[highlightChoice].style.backgroundColor = cards[highlightChoice].style.backgroundColor == "red" ? enemyCards[i][3] : "red";
    //cards[highlightChoice].style.backgroundColor = "#c00000"
}
function disableAllButtons() {
    playerTurnButton.disabled = true;
    doneButton.disabled = true;  
    upgradeButton.disabled = true;
}
function startGame() {
    
    setUpCardBanks();
    initializeCards();
    enableAllButtons();
}
function enableAllButtons() {
    if (initialized) {
        clearInterval(enemyAIInterval);
    }
    initialized = true;
    initializeCards();
    playerTurnButton.disabled = false;
    doneButton.disabled = false;  
    upgradeButton.disabled = false;

}
function upgrade() {
    console.log("Upgrade: " + lastCardID);
    playerCards[lastCardID][0] += (parseInt(Math.random() * playerCards[lastCardID][0] + playerCards[lastCardID][0]/4));
    playerCards[lastCardID][1] += (parseInt(Math.random() * playerCards[lastCardID][1] + playerCards[lastCardID][1]/4));
    initializeCards();
    disableAllButDone();
}
function done() {
    playerDone = true;
    disableAllButtons();
    console.log("Done");
    enemyTurn();
}



function updateDisp() {
    playerHealthDisp.innerHTML = "Player Health = " + playerHealth;
    enemyHealthDisp.innerHTML = "Enemy Health = " + enemyHealth;
}
function tieGame() {
    for (i = 0; i < 3; i++) {
        if (playerCards[i][6] == 1 || enemyCards[i][6] == 1) 
        {
            return false;
        }
    }
    return true;
}
function repeatGameSequence() {
    for (i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = 'black';
        cards[i].classList.toggle("glow");
      }
}
function startAgain() {
    clearInterval(gameOverSeq);
    location.reload();
}
var gameOverSeq;
function gameOver() {
    if (playerHealth <= 0) {
        gameInfoDisp.innerHTML = "You Lost, try again!"
        gameOverSeq = setInterval(repeatGameSequence, 1000);
        setTimeout(startAgain, 4000);
        return true;
    }
    else if (enemyHealth <= 0) {
        gameInfoDisp.innerHTML = "YOU WON BOOYAH!!!"
        gameOverSeq = setInterval(repeatGameSequence, 1000);
        setTimeout(startAgain, 4000);
        return true;
    }
    else if (tieGame())
    {
        gameInfoDisp.innerHTML = "Tie game, tie your shoes!"
        gameOverSeq = setInterval(repeatGameSequence, 1000);
        setTimeout(startAgain, 4000);
        return true;
    }
    return false;
}

startGame();
