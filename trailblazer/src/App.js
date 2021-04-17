import './App.css';
import { Component } from 'react';
import {Header, Grid} from 'semantic-ui-react'
import NavBar from './components/NavBar'
import EventCard from './components/EventCard'

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
        
        <Grid container columns={3}>
          {this.state.events && this.state.events.map(event => 
            <Grid.Column className="event-card-grid" width={5.3} key={event._id}>
              <EventCard event={event}/>
            </Grid.Column>)
          }
        </Grid>
      </div>
    );
  }
}

export default App;
