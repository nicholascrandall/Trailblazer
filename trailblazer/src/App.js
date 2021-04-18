import './App.css';
import { Component } from 'react';
import {Header} from 'semantic-ui-react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar'
import Events from './components/Events'
import SearchBar from './components/SearchBar'
import UserForm from './components/UserForm';
import CreateMeetup from './components/CreateMeetup';

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

  getCurrentUser = async () => {
    const url = baseURL + "/session/"
    const response = await  fetch(url, {
        method: 'GET', 
        mode: 'cors', 
        credentials: 'include'
    })
    if (response.status === 200) {
      const currentUser = await response.json()
      console.log(currentUser)
      console.log(currentUser.currentUser.username)
      this.setState({
        currentUser: currentUser.currentUser
      })
    } else {
      const message = await response.json()
      console.log(message)
    }
  }

  setCurrentUser = (user) => {
    // this.setState({
    //   currentUser: user
    // })
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

    componentWillMount=()=>{
      this.getCurrentUser()
    }

  render() {
    console.log(this.state.currentUser)
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
              <CreateMeetup/>
            </Route>

            {/* /// EVENTS INDEX /// */}
            <Route path="/event">
              <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
              <header className="App-header">
                <Header className="white" size="huge">Trailblazers</Header>
              </header>
              <SearchBar baseURL={baseURL} currentUser={this.state.currentUser}/>
              <Events baseURL={baseURL} setCurrentUser={this.setCurrentUser}/>
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
