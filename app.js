/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- If two 6s in a row loose entire scor.
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, twiceSix, lastDice;

//reset
init();

document.querySelector('.btn-roll').addEventListener('click',() => {
	if (gamePlaying) {
		//1. Random
		var dice1 = Math.floor(Math.random()*6) + 1; 
		var dice2 = Math.floor(Math.random()*6) + 1; 
		
		//2. Display
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
	
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
		
		
		if (dice1 !== 1 && dice2 !== 1) {
			//Add Score
			var score = dice1 + dice2;
			roundScore += score;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			//Next Player
			nextPlayer();
		}
		
		//A player loosses entire score if 2 sixes in a row
		/* if (dice === 6 && lastDice === 6) {
			//player losses score
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = '0';
			nextPlayer();
		} else if (dice !== 1) {
			//Add Score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			//Next Player
			nextPlayer();
		}
		//A player loosses entire score if 2 sixes in a row
		lastDice = dice;
		*/
	}
});

document.querySelector('.btn-hold').addEventListener('click',() => {
	if (gamePlaying) {
		//add current score to global score
		scores[activePlayer] += roundScore;
		
		//update UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		//INput
		var input = document.querySelector('.final-score').value;
		var winningScore;
				
		if (input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}
		
		//check if player won game
		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner !';
			
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
		
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			//Next Player
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);



function init() {
	//state vars
	gamePlaying = true;
	twiceSix = false;
	isSix = false;
	//reset scores
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	//Hide Dice
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
	//Inital Score = 0
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	
	document.querySelector('.player-0-panel').classList.add('active');
	
	
};

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
}















