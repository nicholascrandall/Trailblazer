import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'

export default class EventActions extends Component {
    constructor(props) {
        super(props);
        this.state={
            deleted: false
        }
    }

    deleteEvent = (event) => {
        const url = this.props.baseURL + '/event/' + event._id
        fetch(url,{
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include'
        }).then(response => response.json())
        .then(data => {
            if(data.status === 200){
                this.setState({
                    deleted: true
                })
            }
        })
    }

    joinEvent = (event) => {
        const url = this.props.baseURL + '/event/' + event._id + '/join'
        const joiningUser = {username: this.props.currentUser.username}
        fetch(url,{
            method: 'PATCH',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(joiningUser),
            headers: {'Content-Type': 'application/json'},

        }).then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.status === 200){
                this.props.addAttendee(this.props.currentUser.username)
            }
        })
    }

    render(){
        if (this.state.deleted){
            return <Redirect to='/event'/>
        }
        return(
            <Button.Group vertical labeled icon>
                <Button as={Link} to='/event/edit' icon='edit' content='Edit Event' />
                <Button icon='delete' content='Delete Event' onClick={()=>{this.deleteEvent(this.props.currentEvent)}} />
                <Button icon='add user' content='Join Event' onClick={()=>{this.joinEvent(this.props.currentEvent)}} />
                <Button icon='user delete' content='Leave Event' />
            </Button.Group>
        )
    }
}
