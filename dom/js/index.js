'use strict';

let theH1 = document.querySelector('h1');
console.log(theH1)

//change content
let subtitle = document.querySelector('header p');
subtitle.innerHTML = subtitle.textContent + " <em>Prof Ross</em>";

//change attributes
let img = document.querySelector('img')

//change style
theH1.classList.add('text-success');
img.classList.add('anim')

//create an element
let newLi = document.createElement('li')
newLi.innerHTML = '<a href="https://ischool.uw.edu/">Another iSchool Link</a>'
let linkList = document.querySelector('ul')
linkList.appendChild(newLi)

function renderCookie() {
    let jar = document.querySelector('#cookie-jar');
    let cookie = document.createElement('img')
    cookie.src = "img/cookie.png"
    cookie.alt = "a cookie"
    jar.appendChild(cookie);
}

function renderCookieJar(number) {
    let jar = document.querySelector('#cookie-jar')
    jar.innerHTML = '';
    for(let i=0; i<number; i++){
        renderCookie()
    }
}

//actually do that
renderCookieJar(10)
renderCookieJar(5)

let isPuppy = true

let button1 = document.querySelector('#button1')
img.addEventListener('click', function() {
    if(isPuppy){
        img.src = 'img/husky.jpg';
        isPuppy = false
    } else {
        img.src = 'img/puppy.jpg';
        isPuppy = true
    }
})



