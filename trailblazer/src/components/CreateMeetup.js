import React, { Component } from 'react';
import {Form, Button, Header} from 'semantic-ui-react'
import faker from 'faker'
import _ from 'lodash'


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
    { key: 'Ice Climbing', value: 'Ice Climbing', text: 'Ice Climbing' },
    { key: 'Camping', value: 'Camping', text: 'Camping' },
  ]

const suppliesOptions = [
    { key: 'Backpack', text: 'Backpack', value: 'Backpack' },
    { key: 'Hiking Boots', text: 'Hiking Boots', value: 'Hiking Boots' },
    { key: 'Snacks', text: 'Snacks', value: 'Snacks' },
    { key: 'Mountain Bike', text: 'Mountain Bike', value: 'Mountain Bike' },
    { key: 'Road Bike', text: 'Road Bike', value: 'Road Bike' },
    { key: 'Helmet', text: 'Helmet', value: 'Helmet' },
    { key: 'Warm Layer', text: 'Warm Layer', value: 'Warm Layer' },
    { key: 'Tent', text: 'Tent', value: 'Tent' },
  ]

const addressDefinitions = faker.definitions.address
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
        key: addressDefinitions.state_abbr[index],
        text: state,
        value: addressDefinitions.state_abbr[index],
    }))

  
export default class CreateMeetup extends Component {
    constructor(props) {
        super(props);
        this.state={
            suppliesOptions: suppliesOptions
        }
    }

    handleAddition = (event, { value }) => {
        this.setState((prevState) => ({
            suppliesOptions: [{ text: value, value }, ...prevState.suppliesOptions],
        }))
      }

      
    handleSuppliesChange=(event, { value })=>{
        this.setState({
            currentSupplies: value 
            })
    }

    handleChange = (event) => {

    }

    handleSubmit=(event)=>{

    }

    
    render() {
        let currentSupplies = []
        this.state.currentSupplies? { currentSupplies } = this.state: currentSupplies = [];
        return(
            <>
            <Header as='h2'>Create A New Trip</Header>
            <Form size='large' style={{width: '50%', margin:'0 auto', padding:'20px 0'}} onSubmit={(event)=>this.handleSubmit(event)}>
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
                    name='city'
                    id='city'
                    iconPosition='left'
                    placeholder='City'
                    onChange={(event)=>this.handleChange(event)}
                />
                <Form.Dropdown
                    options={stateOptions} 
                    placeholder='State'
                    search
                    selection
                    fluid
                    name='state'
                    id='state'
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
                <Form.Dropdown
                    placeholder='Activity Type'
                    fluid
                    search
                    selection
                    name='activityType'
                    id='activityType'
                    options={activityOptions}
                    onChange={(event)=>this.handleChange(event)}
                />
                <Form.Dropdown
                    options={this.state.suppliesOptions}
                    placeholder='Supplies'
                    search
                    selection
                    fluid
                    multiple
                    allowAdditions
                    name='supplies'
                    id='supplies'
                    value={currentSupplies}
                    onAddItem={this.handleAddition}
                    onChange={this.handleSuppliesChange}
                />
                <Form.Input 
                    placeholder='Please provide a description of your trip' 
                    name="description"
                    id="description"
                    type='textarea'
                    style={{ minHeight: 100}}
                    onChange={(event)=>this.handleChange(event)}
                 />
                <Button color='teal' fluid size='large' style={{marginTop:'50px'}}  >
                    Create New Trip
                </Button>
        </Form>
        </>
        )
    }
}