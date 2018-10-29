'use strict';

let h1 = $('h1');
console.log(h1);

h1.text('Hello world!');
console.log(h1.text())

let ball = $('circle')
// ball
//     .attr('cx', 225)
//     .attr('cy', 95)
ball.attr({ cx: 225, cy:95 })

let buttons = $('button')
buttons.addClass('btn-success')

//DOM
// let newP = document.createElement('p')
// newP.textContent = "I'm new!"

let newP = $("<p>I'm <em>new</em>!</p>")
console.log(newP)

$('#text .card-body').append(newP)
$('#text .card-body').prepend("<p>I'm first!</p>")

$('img')
    .mouseenter(function(event) {
        $(event.target).attr('src', 'img/surprised.png')
    })
    .mouseleave(function(event) {
        $(event.target).attr('src', 'img/happy.png')
    })
    // .click(function(){
    //     if(state.isHappy) {
    //         $(event.target).attr('src', 'img/surprised.png')
    //         state.isHappy = false
    //     }
    // })

h1.click(function(event) {
    $(event.target).slideUp(1000)
})

const state = {
    playground: {
        ballAtTop: true,
    }
}

ball.click(function(event){
    let ball = $(event.target)
    if(state.playground.ballAtTop){
        ball.animate( {cx:415, cy:320}, 1000, function(){
            //what to do when done
            ball.attr({cx:415, cy:320}) //actually move (not just appearance)
            state.playground.ballAtTop = false
        } )
    } else {
        ball.attr({ cx: 225, cy:95 })
        ball.css({ cx: 225, cy:95 })
        state.playground.ballAtTop = true
    }
})





