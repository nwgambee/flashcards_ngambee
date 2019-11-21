const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck;
    this.currentCard = deck.cards[0];
    this.turns = 0;
    this.incorrectGuesses = [];
    this.startTime = 0;
  }
  returnCurrentCard() {
    return this.currentCard;
  };
  takeTurn(guess) {
    const turn = new Turn(guess, this.currentCard);
    this.turns++;
    if (turn.evaluateGuess() === false) {
      this.incorrectGuesses.push(this.currentCard.id);
    }

    let cardIndex = (this.deck.cards.indexOf(this.currentCard) + 1);
    this.currentCard = this.deck.cards[cardIndex];
    return turn.giveFeedback(guess);

  }
  calculatePercentCorrect() {
    if (this.incorrectGuesses.length === 0) {
      return 100;
    } else {
      return Math.round((1 - (this.incorrectGuesses.length / this.turns)) * 100);
    }
  }
  startTimer() {
    this.startTime = Date.now()
  }
  endRound() {
    let endTime = Date.now();
    let timeTaken = (endTime - this.startTime) / 1000;
    let message = `** Round Over!! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`;
    console.log(message);
    console.log(`It took you ${timeTaken} seconds.`);
    return message;
  }
}

module.exports = Round;
