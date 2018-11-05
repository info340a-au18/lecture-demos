'use strict';

//pre-written messages
let MESSAGES = ['Hello world!', "Goodbye y'all", "silence", "...", "Bueller?"];


class Card {
    
    constructor(message, initial){
        this.message = message
        this.clickedCount = initial
        this.cardDiv = $('<div class="card">')        
        this.body = this.cardDiv.append('<div class="card-body">')
    }

    incrementCount() {
        this.clickedCount++;
        this.body.text(this.message + " " + this.clickedCount)
    }

    render() {
        this.body.text(this.message + " " + this.clickedCount)

        //this <= the class (Card)
        console.log("out callback", this);

        this.cardDiv.click(() => this.incrementCount())


        return this.cardDiv
    }
}

//"main work"
// let card = new Card("Hello world!");
// let renderedCard = card.render();
// $('#content').append(renderedCard)

let cards = MESSAGES.map((msg, idx) => new Card(msg, idx))

cards.forEach((card) => {
    $('#content').append(card.render())
})


let foo = (params) => 'foo '+params; 
