import React, { Component } from 'react';
import {Form, Button} from 'semantic-ui-react'

export default class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            username: this.props.currentUser.username,
            content: '',
            eventid: this.props.eventID
        }
    }

    handleChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit = () => {
        let url = this.props.baseURL + '/comment/'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            credentials: 'include'
        }).then(response => response.json())
        .then(data => {
            this.setState({
                content: ''
            })
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <Form size='big' onSubmit={(event) => this.handleSubmit(event)}>
                <Form.Input 
                    width={12}
                    placeholder='Add a public comment...'
                    value={this.state.content}
                    onChange={(event) => this.handleChange(event)}
                />
                <Button type='submit' color='teal'>Comment</Button>
            </Form>
        )
    }
}