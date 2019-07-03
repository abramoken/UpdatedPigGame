
var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function(){

	if(gamePlaying){
		//1. Random Number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		//2. Display result
		// var diceDom = document.querySelector('.dice');
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
		//3. Update the round score IF the rolled number is NOT a 1
		if (dice1 !== 1 && dice2 !== 1) {
			//Add score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}else {
			//Next player
			nextPlayer();
		}
		/*if (dice === 6 && lastDice ===6) {
			//Player looses score
			scores[activePlayer]  = 0;
			document.querySelector('#score-' + activePlayer).textContent = '0';
			nextPlayer();
		}else if (dice !== 1) {
			//Add score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}else {
			//Next player
			nextPlayer();
		}
		lastDice = dice;
		*/
	}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying){
		//Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;
		//Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		var input = document.querySelector('.final-score').value;
		var winningScore;
		//Undefined, 0, Null or "" are CORECED to False
		//Anything else is CORECED to True
		if(input){
			winningScore = input;
		}else{
			winningScore = 100;
		}
		//Check If the player WON the game
		if(scores[activePlayer] >= winningScore){
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		}else {
			//Next Player
			nextPlayer();
		}
	}
});

function nextPlayer(){
		//Next Player
		//Ternary operator
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.getElementById('dice-1').style.display = 'none';
		document.getElementById('dice-2').style.display = 'none';
}

//New game Button
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	//changing css style
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

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
}
