let template = document.getElementById("newCard").content.children[0];
let cardContainer = document.getElementById("cards");

let addCard = ()=>{
    let card = template.cloneNode(true);
    cardContainer.appendChild(card);
    card.querySelector(".front").focus();
}

let submitDeck = (event)=>{
    event.preventDefault();

    let cards = [];
    let cardElems = document.getElementById("cards").children;
    for(let i = 0; i < cardElems.length; i++){
        let front = cardElems[i].querySelector(".front").value;
        let back = cardElems[i].querySelector(".back").value;

        cards.push([front, back]);
    }

    document.getElementById("cardsInput").value = JSON.stringify(cards);

    event.target.submit();
}

let deleteCard = (card)=>{
    card.parentElement.removeChild(card);
}

addCard();
