import { Component } from 'react';

export default class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            apikey: process.env.REACT_APP_API_KEY,
            city: this.props.city,
        }
    }

    getWeather = () => {
        const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${this.state.apikey}&units=imperial`
        console.log(weatherURL)
        fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
            console.log(data)
            this.setState({
                forecast: data.list
            })
            } else {
                console.log(data)
                this.setState({
                    error: true
                })
            }
            
        })
    }

    componentDidMount() {
        this.getWeather()
    }

    render() {
        console.log(this.state)
        return (
            <div>
                {this.state.error ?
                <h3>Weather Not Found</h3>
                :
                <h3>Weather For {this.state.city}</h3>
                }
            {/* add weather specifics here */}
            </div>
        )
    }
}