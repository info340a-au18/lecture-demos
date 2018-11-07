import React, {Component} from 'react';

class HelloCard extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    Hello World!
                </div>
            </div>
        );
    }
}

class GetWellCard extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    Get well soon!
                </div>
            </div>
        );
    }
}

class Card extends Component {
    render() {

        console.log(this.props.message);

        return (
            <div className="card">
                <div className="card-body">
                    {this.props.message}
                </div>
            </div>
        );
    }
}

export default class CardList extends React.Component {
    render() {

        let cardArray = this.props.messages.map((msgStr) => {
            let card = <Card message={msgStr} />;
            return card;
        })

        // let cardArray = [
        //     <Card message={this.props.messages[0]} />,
        //     <Card message={this.props.messages[1]} />,
        //     <Card message={this.props.messages[2]} />
        // ];

        console.log(cardArray);

        return (
            <div className="card-deck">
                {cardArray}
            </div>
        );
    }
}
