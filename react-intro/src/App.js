import React, { Component } from 'react';

import CardList from './Cards';

class HelloMessage extends React.Component {

    makeMessageElement(string) {
        return <h1 id="hello" className="myclass">{string}</h1>
    }


    render() {
        let message = "Hello world message";
        let h1 = this.makeMessageElement(message);

        //return the DOM to show
        return (
            <div className="jumbotron">
                {h1}
            </div>
        );
    }
}

export default class App extends Component {
    render() {
        let messageArray = ["Hi", "hello", "taking too long", "add", "more", "stuff", "lorem ipsum"];

        return (
            <div>
                <HelloMessage />
                <div className="container">
                    <CardList messages={messageArray} />
                </div>
            </div>
        );
    }
}