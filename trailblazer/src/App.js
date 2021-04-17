import './App.css';
import { Component } from 'react';
import {Header} from 'semantic-ui-react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar'
import Events from './components/Events'
import SearchBar from './components/SearchBar'

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

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            {/* /// EVENTS INDEX /// */}
            <Route path="/event">
              <NavBar/>
              <header className="App-header">
                <Header className="white" size="huge">Trailblazers</Header>
              </header>
              <SearchBar baseURL={baseURL}/>
              <Events baseURL={baseURL}/>
            </Route>

            {/* /// User Login /// */}
            <Route path="/user/login">
              <Header size="large">User Login</Header>
            </Route>

            {/* /// HOME PAGE /// *** this must be the last route because its the least specific */}
            <Route path="/">
              <NavBar/>
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
