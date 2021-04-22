import { Component } from 'react';
import {Card, Container, Icon} from 'semantic-ui-react'
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
        this.setState({
          events: searchedEvents
        })
    }
    
    componentDidMount() {
      this.getEvents()
    }
   
    render() {
      return (
        <>
        <SearchBar baseURL={this.props.baseURL} currentUser={this.props.currentUser} events={this.state.events} searchEvents={this.searchEvents} getEvents={this.getEvents} />
        
        <Container className="event-card-group">
          <Card.Group centered itemsPerRow={3} >
            {this.state.events && this.state.events.map(event =>
              <EventCard 
                key={event._id} 
                event={event} 
                setEvent={this.props.setEvent} 
                />)}
          </Card.Group>
          <Icon 
            onClick={() => this.getEvents()}
            color='teal'
            bordered
            inverted 
            name='refresh' 
            link
            size='large'
          />
        </Container>
        </>
      );
    }
  }