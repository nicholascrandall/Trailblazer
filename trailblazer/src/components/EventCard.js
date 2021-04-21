import React from 'react';
import {Card, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function EventCard (props){
    const spotsLeft = props.event.maxAttendees - props.event.attendees.length
    const attendees = (
        <>
          <Icon name='user' />
            {spotsLeft + ' Spots Remaining'}
          <Link to='/event/edit'><Icon name="edit" onClick={()=>{props.setEvent(props.event)}}/></Link>
        </>
      )
    const d = new Date(props.event.date)
    return (
        <Card
            image={props.event.img}
            header={props.event.name}
            meta={d.toDateString()}
            description={props.event.details.activityType + ' level ' + props.event.details.difficulty}
            extra={attendees}
        />
    )
}