import { Component } from 'react'
import {Comment, Header, Button, Container, Grid, Segment, Rail, Image} from 'semantic-ui-react'
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
        console.log(this.props);
        const d = new Date(this.props.currentEvent.date)
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        return (
            <Container style={{width:'80vw'}}>
              <Grid centered columns={2}>
                <Grid.Column>
                <Segment style={{marginTop:'50px', border:'none', boxShadow: 'none'}}>
                    {/* MAIN CONTENT (Middle) */}
                    <Header as='h1'>{this.props.currentEvent.name}</Header>
                    <p style={{fontSize: '24px', color: 'grey', lineHeight:'1.2em'}}>{d.toLocaleDateString('en',dateOptions)}</p>
                    <p style={{fontSize: '20px', color: 'grey'}}>{this.props.currentEvent.city + ', '+this.props.currentEvent.state}</p>
                    <Image bordered rounded style={{width:'600px', margin: '0 auto'}} src= {this.props.currentEvent.img}/>
                    <h2>{this.props.currentEvent.details.activityType} - Difficulty: {this.props.currentEvent.details.difficulty}</h2>
                    <Header as='h2'>Details:</Header>
                    <p style={{fontSize: '20px'}}>{this.props.currentEvent.details.description}</p>
                    <h2>Supplies:</h2>
                    <ul>
                        {this.props.currentEvent.details.supplies.length > 0?
                        this.props.currentEvent.details.supplies.map((supply, index) => {
                            return <li key={index}>{supply}</li>
                        }):<p style={{fontSize: '20px'}}>No supplies listed. Just bring yourself!</p>}
                    </ul>



                    {/* JOIN BUTTONS AND ATTENDEES (Left Rail) */}
                    <Rail dividing position='left'>
                    <Segment>
                        <EventActions 
                            baseURL={this.props.baseURL} 
                            currentEvent={this.props.currentEvent} 
                            currentUser={this.props.currentUser}
                            addAttendee={this.addAttendee}
                            removeAttendee={this.removeAttendee}
                            attendees={this.state.attendees}
                            />
                        
                        <p style={{marginTop: '20px', fontSize: '20px'}}>({this.props.currentEvent.maxAttendees - this.props.currentEvent.attendees.length} Spots Left)</p>

                        <Header as='h2'><u>Attendees</u>:</Header>
                        {this.state.attendees.length>0?
                            <ol>
                                {this.state.attendees.map((attendee) => <li>{attendee}</li>)}
                            </ol>
                            : <h3>Be the first to join this event!</h3>}
                    </Segment>
                    </Rail>
                            
                    {/* COMMENTS SECTION (Right Rail) */}
                    <Rail dividing position='right' style={{width:'50%'}}>
                    <Segment>
                        <Comment.Group className="comments" size='large'>
                            <Header as='h3' dividing>Comments</Header>
                            {this.state.comments.length === 0 &&
                                <Header>This event doesn't have any comments yet</Header>
                            }
                            {this.state.comments.map((comment, index) => {
                                const t = new Date(comment.time)
                                return <Comment key={index}>
                                    <Comment.Content>
                                        <Comment.Author as='a'>{comment.username}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{t.toLocaleDateString() + ' ' + t.toLocaleTimeString()}</div>
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
                    </Segment>
                    </Rail>

            </Segment>
                </Grid.Column>
            </Grid>
            </Container>
            // </div>
        )
    }
}