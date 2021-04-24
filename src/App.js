import './App.css';
import { Component } from 'react';
import {Button, Header} from 'semantic-ui-react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import NavBar from './components/NavBar'
import Events from './components/Events'
import UserForm from './components/UserForm';
import TripForm from './components/TripForm';
import EventPage from './components/EventPage';
import UserInfo from './components/UserInfo';
import Footer from './components/Footer'

let baseURL = '' 
if (process.env.NODE_ENV === 'development'){
  baseURL = process.env.REACT_APP_LOCAL_URL
} else {
  baseURL = process.env.REACT_APP_PROD_URL
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

  editUserInfo = (data) => {
    this.setState({
        currentUser: data.data
    })
}

  logout = () =>{
    const url = baseURL + '/session/'
      fetch(url, {method:'DELETE'})
      .then(response=> response.json())
      .then(data => {
        this.setState({
          currentUser: ''
        })
      })
    }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            {/* /// New Event /// */}
            <Route path="/event/new">
              <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
              <header className="App-header trip-header">
                <Header className="white" size="huge">Trailblazers</Header>
              </header>
              <TripForm context='new' baseURL={baseURL} currentUser={this.state.currentUser}/>
              <footer>
                <Footer />
              </footer>
            </Route>


            {/* /// Edit Event /// */}
            <Route path="/event/edit">
              <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
              <header className="App-header trip-header">
                <Header className="white" size="huge">Trailblazers</Header>
              </header>
              <TripForm context='edit' editEvent={this.state.currentEvent} baseURL={baseURL} currentUser={this.state.currentUser}/>
              <footer>
                <Footer />
              </footer>
            </Route>

      
            {/* EVENT SHOW PAGE */}
            <Route path="/event/meetup">
              <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
              <header className="App-header trip-header">
                <Header className="white" size="huge">Trailblazers</Header>
              </header>
              <EventPage baseURL={baseURL} currentUser={this.state.currentUser} currentEvent={this.state.currentEvent} />
              <footer>
                <Footer />
              </footer>
            </Route>


            {/* /// EVENTS INDEX /// */}
            <Route path="/event">
              <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
              <header className="App-header">
                <Header className="white" size="huge">Trailblazers</Header>
              </header>
              <Events baseURL={baseURL} setEvent={this.setEvent} currentUser={this.state.currentUser} />
              <footer>
                <Footer />
              </footer>
            </Route>


            {/* /// User Login /// */}
            <Route path="/user/login">
              <UserForm context='login' baseURL={baseURL} setCurrentUser={this.setCurrentUser}/>
              <footer>
                <Footer />
              </footer>
            </Route>


            {/* /// User Sign Up /// */}
            <Route path="/user/new">
              <UserForm context='signup' baseURL={baseURL} setCurrentUser={this.setCurrentUser}/>
              <footer>
                <Footer />
              </footer>
            </Route>

            {/* /// User Profile /// */}
            <Route path="/user/profile">
              <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
              <header className="App-header  profile-header">
                <Header className="white" size="huge">Your Profile</Header>
              </header>
              <UserInfo currentUser={this.state.currentUser} baseURL={baseURL} editUserInfo={this.editUserInfo} setEvent={this.setEvent}/>
              <footer>
                <Footer />
              </footer>
            </Route>


            {/* /// HOME PAGE /// *** this must be the last route because its the least specific */}
            <Route path="/">
              <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
              <header className="App-header">
                <Header className="white" size="huge">Trailblazers</Header>
              </header>
              <Header className="home-header" size="large">
                <Button as={Link} size='huge' color='teal' to='/event/'> Find Meetups </Button>
              </Header>
              <footer className="footer-home">
                <Footer />
              </footer>
            </Route>


          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
