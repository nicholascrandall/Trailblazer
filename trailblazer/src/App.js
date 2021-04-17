import './App.css';
import { Component } from 'react';
import {Header} from 'semantic-ui-react'
import NavBar from './components/NavBar'

let baseURL = '' 
if (process.env.NODE_ENV === 'development'){
  baseURL = 'http://localhost:3003'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  getEvents() {
    const url = baseURL + '/event/'
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({
        events: data
      })
    })
  }

  componentDidMount() {
    this.getEvents()
  }
  
  render() {
    return (
      <div className="App">
        <NavBar/>
        <header className="App-header">
          <Header className="white" size="huge">Trailblazers</Header>
        </header>
        {this.state.events && this.state.events.map(event => <h2>{event.name}</h2>)}
      </div>
    );
  }
}

export default App;
