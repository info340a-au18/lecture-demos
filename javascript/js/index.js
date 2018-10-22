'use strict';

// let array = [1,2,3]
// console.log(array)

// function sayHello(){
//     console.log("Hello");
// }

// console.log(sayHello)


//takes in TWO callback functions!
function doTogether(firstCallback, secondCallback){
    firstCallback();  //execute the first function
    secondCallback();  //execute the second function
    console.log('at the same time!');
}

function patHead() {
    console.log('pat your head');
}

function rubBelly() {
    console.log('rub your belly');
}

//pass in the callbacks to do them together
doTogether(rubBelly(), patHead);



for(item of array){
    console.log(item)
}

let sum = 0
array.forEach(function(n){
    sum = sum + n
});



array.forEach(function(n, idx){
    array[idx] = n*n
});

array = array.map(function(n) {
    return n*n
})

let add = function(total, next){
    return total+next;
}

array.reduce(function(total, next){
    return total+next;
}, 5)