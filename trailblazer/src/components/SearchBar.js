import { Component } from 'react';
import {Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchName: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            searchName: e.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const url = this.props.baseURL + '/event/search?query='  + this.state.searchName
        fetch(url, {
            method: 'GET', 
            mode: 'cors', 
            credentials: 'include',
          })
        .then(response => response.json())
        .then(data => {
            this.props.searchEvents(data.data)
            this.setState({
                searchName: ''
            })
        })
    }

    render() {
        return (
            <div className="searchContainer">
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type="text"
                    className="searchInput"
                    value={this.state.searchName}
                    placeholder={"Search For a Meetup In Your Area..."}
                    onChange={this.handleChange}
                    />
                    <input type="submit" hidden />
                </form>
                {this.props.currentUser?
                <Link to='/event/new'>
                    <Button color='teal' size='large'>
                            <Icon name='add' position='right'/>
                            Create a Trip
                    </Button>
                </Link>:null}
            </div>
        )
    }
}