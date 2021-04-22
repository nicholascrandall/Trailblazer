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
      let query = ''
      if(this.props.profile){
        const today = new Date()
        this.props.future? query = `?attendees=${this.props.currentUser.username}&date=>=${today}`:
                           query = `?attendees=${this.props.currentUser.username}&date=<${today}`
      }
      const url = this.props.baseURL + '/event/' + query

      fetch(url, {
        method: 'GET', 
        mode: 'cors', 
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
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
            {this.state.events && this.state.events.map(event =>
              <EventCard 
                key={event._id} 
                event={event} 
                setEvent={this.props.setEvent} 
                />)}
          </Card.Group>
        </Container>
      );
    }
  }