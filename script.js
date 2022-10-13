const gameContainer = document.getElementById("game");
let eventCount = 0
let firstPick
let secondPick
let flippedCards = 0;
let noClicking = false;
let totalStep=1
let score = 0
let lowestScore=999
const resetbtn= document.getElementById("resetBtn")
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color,'cardDiv');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!

function handleCardClick(event) {
  
  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!firstPick || !secondPick) {
    currentCard.classList.add("flipped");
    firstPick = firstPick || currentCard;
    secondPick = currentCard === firstPick ? null : currentCard;
  }

  if (firstPick && secondPick) {
    noClicking = true;
    // debugger
    let control1= firstPick.className;
    let control2 = secondPick.className;
    
    if (control1=== control2) {
      flippedCards += 2;
      firstPick.removeEventListener("click", handleCardClick);
      secondPick.removeEventListener("click", handleCardClick);
      firstPick = null;
      secondPick = null;
      noClicking = false;
      
      totalStep++
      
    } else {
      setTimeout(function() {
        firstPick.style.backgroundColor = "";
        secondPick.style.backgroundColor = "";
        firstPick.classList.remove("flipped");
        secondPick.classList.remove("flipped");
        firstPick = null;
        secondPick = null;
        noClicking = false;
        totalStep++
        
      }, 1000);
    }
    document.querySelector('#totalStep').innerHTML = `Total Step: ${totalStep}`
  }

  if (flippedCards === COLORS.length) {
    alert(`Game completed`)
    if(lowestScore>totalStep){
     lowestScore= totalStep
     localStorage.setItem('lowestScore',lowestScore)
    }};
}

  lowestScore= localStorage.getItem('lowestScore')

document.getElementById('lowestScore').innerHTML=`Lowest Score: ${lowestScore}`
resetbtn.addEventListener('click', function(){
  window.location.reload()
})
// when the DOM loads
createDivsForColors(shuffledColors);

/* */