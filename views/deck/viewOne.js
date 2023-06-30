let currentCard = 0;
let cards = document.getElementById("cards").children;

let flip = (elem)=>{
    elem.classList.toggle("flipped");
}

let changeCard = (num)=>{
    currentCard += num;
    if(currentCard < 0) currentCard = 0;
    if(currentCard > cards.length - 1) currentCard = cards.length - 1;

    for(let i = 0; i < cards.length; i++){
        cards[i].style.display = "none";
    }

    cards[currentCard].style.display = "flex";
}

document.onkeyup = (event)=>{
    if(event.keyCode === 32) flip(cards[currentCard]);
    if(event.keyCode === 39) changeCard(1);
    if(event.keyCode === 37) changeCard(-1);
}