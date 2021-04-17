import { Component } from 'react';

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
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(url);
            console.log(data);
            // this.setState({
            //     events: data
            //     // need to figure out what to do with this data now that we can search it
            // })
        })
    }

    render() {
        console.log(this.state)
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
           </div>
        )
    }
}

