import React, { Component } from 'react'
import { Button, Modal, Container} from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'

export default class EventActions extends Component {
    constructor(props) {
        super(props);
        this.state={
            deleted: false,
            open: false
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
        if(!this.props.attendees || this.props.attendees.findIndex(attendee => attendee === this.props.currentUser.username ) === -1){
            fetch(url,{
                method: 'PATCH',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(joiningUser),
                headers: {'Content-Type': 'application/json'},

            }).then(response => response.json())
            .then(data => {
                if(data.status === 200){
                    this.props.addAttendee(this.props.currentUser.username)
                }
            })
        }
    }

    leaveEvent = (event) => {
        const url = this.props.baseURL + '/event/' + event._id + '/leave'
        const leavingingUser = {username: this.props.currentUser.username}
        fetch(url,{
            method: 'PATCH',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(leavingingUser),
            headers: {'Content-Type': 'application/json'},

        }).then(response => response.json())
        .then(data => {
            if(data.status === 200){
                this.props.removeAttendee(this.props.currentUser.username)
            }
        })
    }

    setOpen = (bool) =>{
        this.setState({
            open: bool
        })
    }

    render(){
        if (this.state.deleted){
            return <Redirect to='/event'/>
        }

        return(
            this.props.currentUser?
            <Button.Group vertical labeled icon>
                {this.props.currentUser && this.props.currentUser.username === this.props.currentEvent.creator?
                <>
                <Button as={Link} to='/event/edit' color='yellow' size='large' icon='edit' content='Edit Event' />
                <Modal
                    onClose={() => this.setOpen(false)}
                    onOpen={() => this.setOpen(true)}
                    open={this.state.open}
                    trigger={<Button icon='delete' size='large' color='red' content='Delete Event'/>}
                    header='Are you Sure you want to delete this trip?'
                    content={
                    <Container style={{width:'30%', margin:'20px auto'}}>
                        <p style={{margin:'20px 0', fontSize:'16px'}}>This action cannot be undone</p>  
                        <Button onClick={()=>this.setOpen(false)}>Cancel</Button>
                        <Button color='red' onClick={()=>{this.deleteEvent(this.props.currentEvent)}}>Yes, Delete</Button>
                    </Container>}
                    />
                </>:null}

                <Button icon='add user' size='large' color='green' content='Join Event' onClick={()=>{this.joinEvent(this.props.currentEvent)}} />
                <Button icon='user delete' size='large' color='blue' content='Leave Event' onClick={()=>{this.leaveEvent(this.props.currentEvent)}}  />
            </Button.Group>:
            <Button size='large' color='grey'>Login to Join this event!</Button>
        )
    }
}
