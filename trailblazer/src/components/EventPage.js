import { Component } from 'react'
import {Comment, Header, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import CommentForm from './CommentForm'
import EventActions from './EventActions';

export default class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            attendees: this.props.currentEvent.attendees
        }
    }

    getComments() {
        const url = this.props.baseURL + '/comment/' + this.props.currentEvent._id
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                comments: data
            })
        })
    }

    addAttendee = (user) => {
        const copyAttendees = [...this.state.attendees]
        copyAttendees.push(user)
        this.setState({
            attendees: copyAttendees
        })
    }

    removeAttendee = (user) => {
        const copyAttendees = [...this.state.attendees]
        const index = copyAttendees.findIndex(attendee => attendee === user)
        if(index !== -1){
            copyAttendees.splice(index,1)
            this.setState({
                attendees: copyAttendees
            })
        }
    }

    addComment = (comment) => {
        const copyComments = [...this.state.comments]
        copyComments.push(comment)
        this.setState({
            comments: copyComments
        })
    }

    componentDidMount() {
        this.getComments()
    }

    render() {
        const  d = new Date(this.props.currentEvent.date)
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        return (
            <div className="eventShow">
                <h1>{this.props.currentEvent.name}</h1>
                <h3>{this.props.currentEvent.city}, {this.props.currentEvent.state} </h3>
                <p>{d.toLocaleDateString('en',dateOptions)}</p> 
                <hr />
                <h2>Supplies</h2>
                <ul>
                    {this.props.currentEvent.details.supplies.map((supply, index) => {
                        return <li key={index}>{supply}</li>
                    })}
                </ul>
                <h2>Difficulty: {this.props.currentEvent.details.difficulty}</h2>
                <p>{this.props.currentEvent.details.description}</p>
                <h3>Max Attendees: {this.props.currentEvent.maxAttendees}</h3>
                <h3>Current Attendees:</h3>
                <p>
                {this.state.attendees.map((attendee) => {
                    return `${attendee}, `
                })}
                </p>

            <EventActions 
                baseURL={this.props.baseURL} 
                currentEvent={this.props.currentEvent} 
                currentUser={this.props.currentUser}
                addAttendee={this.addAttendee}
                removeAttendee={this.removeAttendee}
                attendees={this.state.attendees}
                />

            <Comment.Group className="comments" size='large'>
                <Header as='h3' dividing>Comments</Header>
                {this.state.comments.length === 0 &&
                    <Header>This event doesn't have any comments yet</Header>
                }
                {this.state.comments.map((comment, index) => {
                    return <Comment key={index}>
                        <Comment.Content>
                            <Comment.Author as='a'>{comment.username}</Comment.Author>
                            <Comment.Metadata>
                                <div>{comment.time}</div>
                            </Comment.Metadata>
                            <Comment.Text>{comment.content}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                })}
            </Comment.Group>

            {this.props.currentUser ? 
            <CommentForm eventID={this.props.currentEvent._id} currentUser = {this.props.currentUser} baseURL = {this.props.baseURL} addComment = {this.addComment} />
            :
            <Link to='/user/login'>
            <Button>
                Log in to add a comment
            </Button>
            </Link>
            }
            
            </div>
        )
    }
}