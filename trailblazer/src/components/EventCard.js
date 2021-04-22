import React from 'react';
import {Card, Icon, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class EventCard extends{
    const spotsLeft = props.event.maxAttendees - props.event.attendees.length
    const attendees = (
        <>
          <Icon name='user' />
            {spotsLeft + ' Spots Remaining'}
          <Link to='/event/edit'><Icon name="edit" onClick={()=>{props.setEvent(props.event)}}/></Link>
        </>
      )
    const image = (
      <>
      <Link to='/event/meetup'>
        <Image src={props.event.img} wrapped ui={false} />
      </Link>
      </>
    )
    const d = new Date(props.event.date)
    return (
        // <Link to='/event/meetup'>
          <Card
              image={image}
              header={props.event.name}
              meta={d.toDateString()}
              description={props.event.details.activityType + ' level ' + props.event.details.difficulty}
              extra={attendees}
              onClick={() => props.setEvent(props.event)}
          />
        // </Link>
    )
}