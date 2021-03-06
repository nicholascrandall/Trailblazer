import React, { Component } from 'react';
import {Form} from 'semantic-ui-react'

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: this.props.currentUser.fullname,
            avatar: this.props.currentUser.avatar,
            about: this.props.currentUser.about
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        this.props.setOpen(false)
        const url = this.props.baseURL + '/user/' + this.props.currentUser._id
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {'Content-Type': 'application/json'},
            mode: 'cors', 
            credentials: 'include'
        }).then(response => response.json())
        .then(data => {
            if(data.status === 200) {
                this.props.editUserInfo(data);
            }
        })
    }
    
    render() {  
        return(
            <Form onSubmit={event =>this.handleSubmit(event)}>
                <Form.Input id='fullname' name='fullname' value={this.state.fullname} onChange={event =>this.handleChange(event)}/>
                <Form.Input id='avatar' name='avatar' value={this.state.avatar} onChange={event =>this.handleChange(event)}/>
                <Form.TextArea id='about' name='about' value={this.state.about} onChange={event =>this.handleChange(event)}/>
                <Form.Button type='submit' color='teal' fluid size='large' style={{marginTop:'20px'}} >
                    Submit Edits
                </Form.Button>
            </Form>
        )
    }
}