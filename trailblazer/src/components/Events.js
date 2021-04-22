import { Component } from 'react';
import {Card, Container, Icon} from 'semantic-ui-react'
import EventCard from './EventCard'
import SearchBar from './SearchBar'

export default class Events extends Component {
    constructor(props) {
      super(props);
      this.state = {
        events: [],
        oldEvents: []

      }
    }
  
    getEvents() {
      let query = ''
      if(this.props.profile){
        const today = new Date()
        console.log(today.toLocaleDateString());
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
  
    searchEvents = (searchedEvents) => {
        this.setState({
          oldEvents: this.state.events,
          events: searchedEvents
        })
    }
    
    refresh = () => {
      if (this.state.oldEvents.length > 0) {
      this.setState({
        events: this.state.oldEvents
      })
      }
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
            onClick={() => this.refresh()}
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