import { Component } from 'react'
import {Comment} from 'semantic-ui-react'

export default class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    getEvent() {
        console.log(this.props.currentEvent)
        const url = this.props.baseURL + '/event/' + this.props.currentEvent._id
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                events: data.data
            })
        })
    }

    componentDidMount() {
        this.getEvent()
    }

    render() {
        return (
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
            </div>
        )
    }
}