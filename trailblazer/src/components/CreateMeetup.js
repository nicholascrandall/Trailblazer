import React, { Component } from 'react';
import {Form, Button, Header} from 'semantic-ui-react'
import { Redirect } from "react-router-dom";
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
        this.props.context === 'new'?
            this.state={
                created: false,
                suppliesOptions: suppliesOptions,
            } :
            this.state={
                created: false,
                suppliesOptions: suppliesOptions,
                currentSupplies: this.props.editEvent.details.supplies,
                name: this.props.editEvent.name,
                city: this.props.editEvent.city,
                state: this.props.editEvent.state,
                date: this.props.editEvent.date,
                creator: this.props.currentUser.username, 
                maxAttendees: this.props.editEvent.maxAttendees,
                difficulty: this.props.editEvent.details.difficulty, 
                activityType: this.props.editEvent.details.activityType,
                description: this.props.editEvent.details.description,
                img: this.props.editEvent.img
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

    handleDropDown = (event, data) => {
        this.setState({
            [data.id]: data.value
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })

    }

    handleSubmit=(event)=>{
        const url = this.props.baseURL + '/event/'
        const newTrip = {
            name: this.state.name,
            city: this.state.city,
            state: this.state.state,
            date: this.state.date.split('T')[0],
            creator: this.props.currentUser.username, 
            maxAttendees: this.state.maxAttendees,
            details:{
                difficulty: this.state.difficulty, 
                activityType: this.state.activityType,
                supplies: this.state.currentSupplies,
                description: this.state.description
                },
            img: this.state.img
        }
        fetch(url, {
            method:'POST',
            body: JSON.stringify(newTrip),
            headers: {'Content-Type': 'application/json'},
            mode: 'cors', 
            credentials: 'include'
        }).then(response => response.json())
        .then(data => {
            console.log(data.status);
            console.log(data);
            if(data.status === 200) {
                this.setState({
                    created:true
                })
            }
        })
    }

    
    render() {
        let editEvent = this.props.editEvent
        console.log(this.props);
        console.log(this.state);
        if (this.state.created) {
            return <Redirect to='/event/' />
          }
        let currentSupplies = []
        this.state.currentSupplies? { currentSupplies } = this.state: currentSupplies = [];
        return(
            <>
            
            {this.props.context === 'edit'? 
            <Header as='h2'>Edit {this.state.name}</Header>:
            <Header as='h2'>Create A New Trip</Header>}

            <Form size='large' style={{width: '50%', margin:'0 auto', padding:'20px 0'}} onSubmit={(event)=>this.handleSubmit(event)}>
                <Form.Input 
                    fluid 
                    name='name'
                    id='name'
                    placeholder='Trip Name' 
                    required
                    value= {this.state.name}
                    onChange={(event)=>this.handleChange(event)}
                    />
                <Form.Input
                    fluid
                    icon='picture'
                    name='img'
                    id='img'
                    iconPosition='left'
                    placeholder='Link to Image'
                    value= {this.state.img}
                    onChange={(event)=>this.handleChange(event)}
                />
                <Form.Input
                    fluid
                    icon='compass'
                    name='city'
                    id='city'
                    iconPosition='left'
                    placeholder='City'
                    value= {this.state.city}
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
                    value= {this.state.state}
                    onChange={this.handleDropDown}
                />
                <Form.Input
                    fluid
                    name='date'
                    id='date'
                    placeholder='Event Date'
                    type="date"
                    value= {this.state.date}
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
                    value= {this.state.maxAttendees}
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
                    value= {this.state.difficulty}
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
                    value= {this.state.activityType}
                    onChange={this.handleDropDown}
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
                <Form.TextArea 
                    placeholder='Please provide a description of your trip' 
                    name="description"
                    id="description"
                    style={{ minHeight: 100}}
                    value={this.state.description}
                    onChange={(event)=>this.handleChange(event)}
                 />
                
                <Button color='teal' fluid size='large' style={{marginTop:'50px'}}  >
                    {this.props.context === 'edit'? <>Submit Edits</>:<>Create New Event</>}
                </Button>
        </Form>
        </>
        )
    }
}