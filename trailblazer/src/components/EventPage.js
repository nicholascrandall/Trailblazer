import { Component } from 'react'
import {Comment, Header, Button} from 'semantic-ui-react'
import CommentForm from './CommentForm'
import {Link} from 'react-router-dom'

export default class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    // we already have the event stored in props so shouldn't need

    // getEvent() {
    //     console.log(this.props.currentEvent)
    //     const url = this.props.baseURL + '/event/' + this.props.currentEvent._id
    //     fetch(url, {
    //         method: 'GET',
    //         mode: 'cors',
    //         credentials: 'include',
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         this.setState({
    //             events: data
    //         })
    //     })
    // }

    getComments() {
        console.log(this.props.currentEvent)
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


    componentDidMount() {
        // this.getEvent()
        this.getComments()
    }

    render() {
        return (
            console.log(this.state.comments),
            <div className="eventShow">
                <h1>{this.props.currentEvent.name}</h1>
                <h3>{this.props.currentEvent.city}, {this.props.currentEvent.state} </h3>
                <p>Date: {this.props.currentEvent.date}</p> 
                {/* we need to find a better way to display the date - either changing it in the backend or having our form convert the data to a string*/}
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
                {this.props.currentEvent.attendees.map((attendee) => {
                return `${attendee}, `
                })}
                </p>
            <Comment.Group classname="comments" size='large'>
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
            <CommentForm eventID={this.props.currentEvent._id} currentUser = {this.props.currentUser} baseURL = {this.props.baseURL} />
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