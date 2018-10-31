'use strict';

let form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    console.log("Form sumbmitted!");

    let inputBox = document.querySelector('#queryInput');
    let query = inputBox.value;
    console.log("searching for", query);

    //send AJAX request ourselves
    let url = "https://api.github.com/search/repositories?q="+query
    console.log("sending request to", url);

    //send the request!
    // let promise = fetch(url)
    // let updatedBuzzer = promise.then(function(response){
    //     let encodePromise = response.json() //extract json content from response
    //     return encodePromise;       
    // })
    // updatedBuzzer.then(function(data){
    //     console.log(data);
    // })


    fetch(url)
        .then(function(response){
            return response.json();       
        })
        .then(renderRepos)
        .catch(function(error){
            console.log(error.message);
        })
        .then(function(){   
            console.log("final then!")
        })

    console.log("do more stuff"); //there is no data yet

})


function renderRepos(data){
    $("#content").append("<ul>...")

}