import React, { Component } from 'react';
import {Form, Button, Dropdown, TextArea} from 'semantic-ui-react'


const activityOptions = [
    { key: 'Mountain Biking', value: 'Mountain Biking', text: 'Mountain Biking' },
    { key: 'Road Biking', value: 'Road Biking', text: 'Road Biking' },
    { key: 'Hiking', value: 'Hiking', text: 'Hiking' },
    { key: 'Picnicking', value: 'Picnicking', text: 'Picnicking' },
    { key: 'Trail Work', value: 'Trail Work', text: 'Trail Work' },
    { key: 'Kayaking/Canoeing', value: 'Kayaking/Canoeing', text: 'Kayaking/Canoeing' },
    { key: 'Paddleboarding', value: 'Paddleboarding', text: 'Paddleboarding' },
    { key: 'Sailing', value: 'Sailing', text: 'Sailing' },
    { key: 'Swimming', value: 'Swimming', text: 'Swimming' },
    { key: 'Climbing', value: 'Climbing', text: 'Climbing' },
    { key: 'Skiing/Snowboarding', value: 'Skiing/Snowboarding', text: 'Skiing/Snowboarding' },
  ]

  
export default class CreateMeetup extends Component {
    constructor(props) {
        super(props);
        
    }

    handleChange=(event)=>{

    }

    handleSubmit=(event)=>{

    }

    
    render() {
        return(
            <Form size='large' style={{width: '50%', margin:'0 auto', padding:'50px 0'}} onSubmit={(event)=>this.handleSubmit(event)}>
                <Form.Input 
                    fluid 
                    name='name'
                    id='name'
                    placeholder='Trip Name' 
                    required
                    onChange={(event)=>this.handleChange(event)}
                    />
                <Form.Input
                    fluid
                    icon='picture'
                    name='img'
                    id='img'
                    iconPosition='left'
                    placeholder='Link to Image'
                    onChange={(event)=>this.handleChange(event)}
                />
                <Form.Input
                    fluid
                    icon='compass'
                    name='location'
                    id='location'
                    iconPosition='left'
                    placeholder='Location'
                    onChange={(event)=>this.handleChange(event)}
                />
                <Form.Input
                    fluid
                    icon='calendar'
                    name='date'
                    id='date'
                    iconPosition='left'
                    placeholder='Date'
                    type="date"
                    onChange={(event)=>this.handleChange(event)}
                />
                <Form.Input
                    fluid
                    icon='user'
                    name='maxAttendees'
                    id='maxAttendees'
                    iconPosition='left'
                    placeholder='Number of Attendees'
                    type="number"
                    onChange={(event)=>this.handleChange(event)}
                />
                <Form.Input
                    fluid
                    icon='warning sign'
                    name='difficulty'
                    id='difficulty'
                    iconPosition='left'
                    placeholder='Difficulty Rating'
                    type="number"
                    max="5"
                    min="1"
                    onChange={(event)=>this.handleChange(event)}
                />
                <Dropdown
                    placeholder='Activity Type'
                    fluid
                    search
                    selection
                    name='activityType'
                    id='activityType'
                    options={activityOptions}
                    onChange={(event)=>this.handleChange(event)}
                />
                <Form.Input 
                    placeholder='Please list a description including any supplies needed' 
                    name="supplies"
                    id="supplies"
                    type='textarea'
                    style={{ minHeight: 100, marginTop:'20px'}}
                    onChange={(event)=>this.handleChange(event)}
                 />
                <Button color='teal' fluid size='large' style={{marginTop:'50px'}}  >
                    Create New Trip
                </Button>
        </Form>
        )
    }
}