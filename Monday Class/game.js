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
let stateOfGame = {
        'gameInfoDisplayMessage': '',
        'playerHealth': 50,
        'playerEnabled': false,
        'enemyHealth': 50,
        'enemyEnabled': false,
        'cards': [
            ['Card name', 1, 4, '#121212', 'https://link.to.picture'], 
            ['Card name', 1, 4, '#121212', 'https://link.to.picture'], 
            ['Card name', 1, 4, '#121212', 'https://link.to.picture']
        ]
    },
    startGame = function() {
        stateOfGame['playerEnabled'] = true;
        stateOfGame['enemyEnabled'] = true;

    },
    endGame = function() {
        stateOfGame['playerEnabled'] = false;
        stateOfGame['enemyEnabled'] = false;
    },
    isGameOver = function() {
        return stateOfGame['playerEnabled'] === false && stateOfGame['enemyEnabled'] === false;
    },
    updateDisp = function() {
        if (stateOfGame.playerHealth <= 0) {
            stateOfGame['gameInfoDisplayMessage'] = "You Lost, try again?";
            endGame();
        } else if (stateOfGame.enemyHealth <= 0) {
            stateOfGame['gameInfoDisplayMessage'] = "YOU WON BOOYAH!!!";
            endGame();
        }
    },
    updateTemplate = function() {
        if (stateOfGame['gameInfoDisplayMessage'].trim().length > 0) {
            document.getElementById('info').innerHTML = stateOfGame['gameInfoDisplayMessage'];
        }
        document.getElementById('playerHealth').innerHTML = "Player Health = " + stateOfGame['playerHealth'];
        document.getElementById('enemyHealth').innerHTML = "Enemy Health = " + stateOfGame['enemyHealth'];
        if (stateOfGame['playerEnabled']) {
            playerTurnButton.removeAttribute('disabled');
        } else {
            playerTurnButton.setAttribute('disabled', 'disabled');
        }

        if (stateOfGame['enemyEnabled']) {
            enemyTurnButton.removeAttribute('disabled');
        } else {
            enemyTurnButton.setAttribute('disabled', 'disabled');
        }
    };

//Button logic
//1. Start Button
var startGameButton = document.getElementById('startButton');
startGameButton.onclick = function() {
    startGame();
    updateTemplate();
};

//2. Player Button
var playerTurnButton = document.getElementById('attackButton');
playerTurnButton.onclick = function() {
    playerTurn();
};
function playerTurn() {
    if (!isGameOver()) {
        stateOfGame['enemyHealth'] = stateOfGame['enemyHealth'] - 10;
        updateDisp();
        updateTemplate();
    }
};

//3. Enemy Button
var enemyTurnButton = document.getElementById('enemyButton');
enemyTurnButton.onclick = function() {
    enemyTurn();
};
function enemyTurn() {
    if (!isGameOver()) {
        stateOfGame['playerHealth'] -= 10;
        updateDisp();
        updateTemplate();
    }
};