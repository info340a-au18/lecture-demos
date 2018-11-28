import React, { Component } from 'react';

import SignUpForm from './SignUp';
import TaskApp from './Tasks';

import firebase from 'firebase/app';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {user: undefined}
  }

  //"Lift up" from SignUp.js component
  componentDidMount() {
    this.authUnSubFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser){ //signed in!
        this.setState({user: firebaseUser})
      } else { //signed out
        this.setState({user: null})
      }
    })
  }

  componentWillUnmount() {
    this.authUnSubFunction() //stop listening for auth changes
  }

  render() {
    let content = <SignUpForm />
    if(this.state.user){
      content = <TaskApp />
    } 

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default App;