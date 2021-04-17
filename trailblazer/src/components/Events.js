import { Component } from 'react';
import {Grid} from 'semantic-ui-react'
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
          <Grid container columns={3}>
            {this.state.events && this.state.events.map(event => 
              <Grid.Column className="event-card-grid" width={5} key={event._id}>
                <EventCard event={event}/>
              </Grid.Column>)
            }
          </Grid>
      );
    }
  }