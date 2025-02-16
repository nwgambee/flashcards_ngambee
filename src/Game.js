const data = require('../src/data');
const prototypeQuestions = data.prototypeData;
const util = require('../src/util');

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

class Game {
  constructor() {
    this.currentRound = '';
    this.deck;
    this.cards = [];
    this.gameTime = 0;
  }
  startGame() {
    for (var i = 0; i < prototypeQuestions.length; i++) {
      const card = new Card(prototypeQuestions[i]);
      this.cards.push(card);
    }
    const deck = new Deck(this.cards);
    const round = new Round(deck);
    this.currentRound = round;
    this.printMessage(deck);
    this.printQuestion(round);
    round.startTimer();
  }
  printMessage(deck) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }

  printQuestion(round) {
    util.main(round);
  }
}

module.exports = Game;
