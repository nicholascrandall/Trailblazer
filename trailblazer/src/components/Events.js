import { Component } from 'react';
import {Card, Container} from 'semantic-ui-react'
import EventCard from './EventCard'

export default class Events extends Component {
    constructor(props) {
      super(props);
      this.state = {
        
      }
    }
  
    getEvents() {
      const url = this.props.baseURL + '/event/'
      fetch(url, {
        method: 'GET', 
        mode: 'cors', 
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => {
        // this.props.setCurrentUser(data.currentUser)
        this.setState({
          events: data.data
        })
      })
    }
  
    componentDidMount() {
      this.getEvents()
    }
    
    render() {
      return (
        <Container className="event-card-group">
          <Card.Group centered itemsPerRow={3} >
            {this.state.events && this.state.events.map(event =><EventCard key={event._id} event={event}/>)}
          </Card.Group>
        </Container>
      );
    }
  }