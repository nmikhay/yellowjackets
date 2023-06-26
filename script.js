const cardImages = [
  "old1.jpg", "young1.jpg", "old2.jpg", "young2.jpg",
  "old3.jpg", "young3.jpg", "old4.jpg", "young4.jpg",
  "old5.jpg", "young5.jpg", "old6.jpg", "young6.jpg",
  "old7.jpg", "young7.jpg", "old8.jpg", "young8.jpg"
];

let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

window.onload = function () {
  const cardGrid = document.getElementById('card-grid');

  shuffle(cardImages);

  for (let img of cardImages) {
    let card = createCard(img);
    card.addEventListener('click', flipCard);
    cardGrid.appendChild(card);
    cards.push(card);
  }
};

function createCard(img) {
  let card = document.createElement('div');
  card.classList.add('card');
  card.dataset.character = img;
  card.dataset.isFlipped = false;

  let cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');

  let cardFront = document.createElement('div');
  cardFront.classList.add('card-front');
  cardFront.style.backgroundImage = "url('images/card-back.jpg')";

  let cardBack = document.createElement('div');
  cardBack.classList.add('card-back');
  cardBack.style.backgroundImage = `url('images/${img}')`;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);

  card.appendChild(cardInner);

  return card;
}

function flipCard() {
  if (lockBoard || this === firstCard || this.dataset.isFlipped === "true") return;

  this.classList.add('flip');
  this.dataset.isFlipped = true;

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  let firstNumber = getNumberFromCard(firstCard);
  let secondNumber = getNumberFromCard(secondCard);

  if (firstNumber === secondNumber) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  setTimeout(() => {
    firstCard.style.visibility = 'hidden';
    secondCard.style.visibility = 'hidden';

    checkGameComplete();
    resetBoard();
  }, 1000);
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard.dataset.isFlipped = false;
    secondCard.dataset.isFlipped = false;

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function checkGameComplete() {
  let remainingCards = cards.filter(card => card.style.visibility !== 'hidden');
  if (remainingCards.length === 0) {
    alert('Congratulations! You have completed the game.');
  }
}

function getNumberFromCard(card) {
  let character = card.dataset.character;
  let number = character.match(/\d+/)[0];
  return number;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
































