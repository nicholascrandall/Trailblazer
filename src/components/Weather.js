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
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${this.state.apikey}&units=imperial`
        fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
            if (data.main) {
            this.setState({
                forecast: data
            })
            }
        })
    }

    componentDidMount() {
        this.getWeather()
    }

    render() {
        if (this.state.forecast) {
            return (
                <div>
                    <p>Temp: {this.state.forecast.main.temp}° F</p>
                    <p>Wind: {this.state.forecast.wind.speed} MPH</p>
                    <p>{this.state.forecast.weather[0].description}</p>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Weather Details Not Found</h3>
                </div>
            )
        }
    }
}