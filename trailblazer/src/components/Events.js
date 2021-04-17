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
        <Container className="event-card-group">
          <Card.Group centered itemsPerRow={4} >
            {this.state.events && this.state.events.map(event =><EventCard event={event}/>)}
          </Card.Group>
        </Container>
      );
    }
  }