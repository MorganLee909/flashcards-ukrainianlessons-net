let currentCard = 0;
let cards = document.getElementById("cards").children;

let flip = (elem)=>{
    elem.classList.toggle("flipped");
}

let updateCounter = ()=>{
    let counter = document.getElementById("counter");
    counter.textContent = `Card: ${currentCard + 1} of ${cards.length}`;
}

let changeCard = (num)=>{
    currentCard += num;
    if(currentCard < 0) currentCard = 0;
    if(currentCard > cards.length - 1) currentCard = cards.length - 1;

    for(let i = 0; i < cards.length; i++){
        cards[i].style.display = "none";
    }

    cards[currentCard].style.display = "flex";

    updateCounter();
}

let shuffle = ()=>{
    let cardContainer = document.getElementById("cards");

    //Copy card elements to new array
    let newArr = [];
    for(let i = 0; i < cards.length; i++){
        newArr.push(cards[i]);
    }

    //Shuffle new array
    for(let i = 0; i < newArr.length; i++){
        let newPos = Math.floor(Math.random() * newArr.length);

        let temp = newArr[i];
        newArr[i] = newArr[newPos];
        newArr[newPos] = temp;
    }

    //Empty the container
    while(cardContainer.children.length > 0){
        cardContainer.removeChild(cardContainer.firstChild);
    }

    //Repopulate
    for(let i = 0; i < newArr.length; i++){
        cardContainer.appendChild(newArr[i]);
    }

    //Update necessary data for display
    cards = document.getElementById("cards").children;
    restart();
}

let restart = ()=>{
    currentCard = 0;
    changeCard(0)
}

document.onkeyup = (event)=>{
    if(event.keyCode === 32) flip(cards[currentCard]);
    if(event.keyCode === 39) changeCard(1);
    if(event.keyCode === 37) changeCard(-1);
    if(event.keyCode === 83) shuffle();
    if(event.keyCode === 82) restart();
}