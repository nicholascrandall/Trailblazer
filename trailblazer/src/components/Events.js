import { Component } from 'react';
import {Card, Container} from 'semantic-ui-react'
import EventCard from './EventCard'
import SearchBar from './SearchBar'

export default class Events extends Component {
    constructor(props) {
      super(props);
      this.state = {
        events: []
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
  
    searchEvents = (searchedEvents) => {
      if (this.state.events.length > 0) {
        this.setState({
          events: searchedEvents
        })
      } else {
        this.getEvents()
      }
    }
    
    componentDidMount() {
      this.getEvents()
    }
   
    render() {
      return (
        <>
        <SearchBar baseURL={this.props.baseURL} currentUser={this.props.currentUser} events={this.state.events} searchEvents={this.searchEvents} />
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
        </>
      );
    }
  }