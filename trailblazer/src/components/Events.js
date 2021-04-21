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
        this.setState({
          events: data.data
        })
      })
    }

    editEvent = (data) => {
      const copyEvents = [...this.state.events]
      const index = this.state.events.findIndex(event => event._id === data._id)
      copyEvents[index] = data
      console.log(copyEvents[index]);
      this.setState({
        events: copyEvents
      })
    }
  
    componentDidMount() {
      this.getEvents()
    }
    
    render() {
      return (
        <Container className="event-card-group">
          <Card.Group centered itemsPerRow={3} >
            {this.state.events && this.state.events.map(event =>
              <EventCard 
                key={event._id} 
                event={event} 
                setEvent={this.props.setEvent} 
                editEvent={this.editEvent}/>)}
          </Card.Group>
        </Container>
      );
    }
  }