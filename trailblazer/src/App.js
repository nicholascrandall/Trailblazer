import './App.css';
import { Component } from 'react';
import {Header} from 'semantic-ui-react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar'
import Events from './components/Events'
import SearchBar from './components/SearchBar'
import UserForm from './components/UserForm';
import TripForm from './components/TripForm';
import EventPage from './components/EventPage';

let baseURL = '' 
if (process.env.NODE_ENV === 'development'){
  baseURL = 'http://localhost:3003'
} else {
  /// set the url to our deployed app url 
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  setCurrentUser = (user) => {
    this.setState({
      currentUser: user
    })
  }

  setEvent = (event) => {
    this.setState({
      currentEvent: event
    })
  } 

  logout = () =>{
    const url = baseURL + '/session/'
      fetch(url, {method:'DELETE'})
      .then(response=> response.json())
      .then(data => {
        console.log(data)
        this.setState({
          currentUser: ''
        })
      })
    }

  render() {
    // console.log(this.state.currentUser)
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            {/* /// New Event /// */}
            <Route path="/event/new">
              <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
              <header className="App-header">
                <Header className="white" size="huge">Trailblazers</Header>
              </header>
              <TripForm context='new' baseURL={baseURL} currentUser={this.state.currentUser}/>
            </Route>


            {/* /// Edit Event /// */}
            <Route path="/event/edit">
              <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
              <header className="App-header">
                <Header className="white" size="huge">Trailblazers</Header>
              </header>
              <TripForm context='edit' editEvent={this.state.currentEvent} baseURL={baseURL} currentUser={this.state.currentUser}/>
            </Route>

      
            {/* EVENT SHOW PAGE */}
            <Route path="/event/meetup">
              <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
              <header className="App-header">
                <Header className="white" size="huge">Trailblazers</Header>
              </header>
              <EventPage baseURL={baseURL} currentUser={this.state.currentUser} currentEvent={this.state.currentEvent} />
            </Route>


            {/* /// EVENTS INDEX /// */}
            <Route path="/event">
              <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
              <header className="App-header">
                <Header className="white" size="huge">Trailblazers</Header>
              </header>
              <Events baseURL={baseURL} setEvent={this.setEvent} currentUser={this.state.currentUser} />
            </Route>


            {/* /// User Login /// */}
            <Route path="/user/login">
              <UserForm context='login' baseURL={baseURL} setCurrentUser={this.setCurrentUser}/>
            </Route>


            {/* /// User Sign Up /// */}
            <Route path="/user/new">
              <UserForm context='signup' baseURL={baseURL} setCurrentUser={this.setCurrentUser}/>
            </Route>


            {/* /// HOME PAGE /// *** this must be the last route because its the least specific */}
            <Route path="/">
              <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
              <header className="App-header">
                <Header className="white" size="huge">Trailblazers</Header>
              </header>
              <Header size="large">Home Page</Header>
            </Route>


          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
