import React, { Component } from 'react';
import {Card, Icon} from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom'

export default class EventCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
          clicked: false
      }
    }
  
    setClicked = () =>{
      this.setState({clicked: true})
    }

    render() {
      console.log(this.state);
      const spotsLeft = this.props.event.maxAttendees - this.props.event.attendees.length
      const attendees = (
          <>
            <Icon name='user' />
              {spotsLeft + ' Spots Remaining'}
            <Link to='/event/edit'><Icon name="edit" onClick={()=>{this.props.setEvent(this.props.event)}}/></Link>
          </>
        )
      const  d = new Date(this.props.event.date)

      if (this.state.clicked) {
        return <Redirect to='/event/meetup' />
      }

      return (
          <Card
              image={this.props.event.img}
              header={this.props.event.name}
              meta={d.toDateString()}
              description={this.props.event.details.activityType + ' level ' + this.props.event.details.difficulty}
              extra={attendees}
              onClick={() => {
                this.props.setEvent(this.props.event)
                this.setClicked()
                }}
          />
    )
    }
}