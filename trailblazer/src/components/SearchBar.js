import { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchName: '',
            redirect: null,
        }
    }

    handleChange = (e) => {
        this.setState({
            eventName: e.target.value
        })
    }

    handleSubmit = () => {

    }

    render() {
        return (
            <div class="searchContainer">
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type="text"
                    class="searchInput"
                    value={this.searchName}
                    placeholder={"Search For a Meetup In Your Area..."}
                    onChange={this.handleChange}
                    />
                    <input type="submit" hidden />
                </form>
           </div>
        )
    }
}

