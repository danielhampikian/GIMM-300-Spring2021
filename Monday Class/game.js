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



//display variables
var gameInfoDisp = document.getElementById('info');
var playerHealthDisp = document.getElementById('playerHealth');
var enemyHealthDisp = document.getElementById('enemyHealth');

//event variables
var playerTurnButton = document.getElementById('enemyTurn');
playerTurnButton.onclick = function() {
    playerTurn()
};
var enemyTurnButton = document.getElementById('playerTurn');
enemyTurnButton.onclick = function() {
    enemyTurn()
};
var startGameButton = document.getElementById('play');
startGameButton.onclick = function() {
    startGame()
};


function playerTurn(){
    if(!gameOver()) {
    enemyHealth = enemyHealth - 10;
    updateDisp();
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
        // [1, 2, 'random name', 'random color', 'enemy_id_3']

        console.log("card stats: " + cardStats);
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
    console.log("Range for name: " + length);
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

function getRandomColor() {
    var colorLetters = "0123456789abcdef";
    var ret = '#';
    for (var i = 0; i < 6; i++){
        ret += colorLetters.charAt(parseInt(Math.random() * colorLetters.length));
    }
    return ret;
}
function initializeStartingCards(){
    console.log("Calling");
    //Get a list of all the cards damage in play in the game:
    var cardsDamage = document.getElementsByClassName('card-attack');
    var cardsDefense= document.getElementsByClassName('card-defense');
    var cardsName = document.getElementsByClassName('card-name');
    var cards = document.getElementsByClassName('card');
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
        
        cards[i].id = "enemy_id_" + enemyCards[i][4];
        }
        //player cards:
        else {
        //set the attack of the enemy card damage by accessing the list at i
        cardsDamage[i].innerHTML = "Attack: " + playerCards[i][0];
        //set the defense
        cardsDefense[i].innerHTML = "Defense: " + playerCards[i][1];
        //set the name
        cardsName[i].innerHTML = playerCards[i][2];

        cards[i].style.backgroundColor = playerCards[i][3];
        }

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
    //set up random stats for all cards:
    setUpCardBanks();

    //set up cards in play
    initializeStartingCards();
    
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
