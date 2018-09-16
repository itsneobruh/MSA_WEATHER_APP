import * as React from 'react';
import { Component } from 'react';
import { autobind } from 'core-decorators';
import {  APIKEY } from '../config';
import WeatherDisplay from './WeatherDisplay';
import CircularProgress from '@material-ui/core/CircularProgress';



interface Props {}

interface State {
	loading: boolean;
	weatherData?: any;
	text?: string;
}

@autobind
export default class Weather extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			loading: true,
			weatherData: undefined,
			text: "Auckland"
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	async getCurrentWeather(geolocation?: Geolocation) {
		
		const res = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${this.state.text}&appid=${APIKEY}`);
		try{
		const resp = (await res.json());
		console.log(resp);
		this.setState({
			loading: false,
			weatherData: resp
		});
		}catch (e){
			this.setState({
				text: "Auckland",
				weatherData: this.state.weatherData
			})
		}
	}

	async componentDidMount() {
		await this.getCurrentWeather();
	}

	async onSubmit(event: any){
		try{
		event.preventDefault();
		this.setState({text: event.target.value});
		await this.getCurrentWeather();
		}catch ( e){
			console.log(e);
		}
	}

	async onChange(event : any){
		this.setState({text: event.target.value});
	}

	render() {
		const loading = this.state.loading && <CircularProgress />;
		const weatherDisplay = this.state.weatherData && (
			<WeatherDisplay weatherData={this.state.weatherData} />
		);
		

		return (
			<div>
				{loading}
				<form onSubmit={this.onSubmit}>
				<input
					type="text"
					value={this.state.text}
					onChange={this.onChange}/>				
					{weatherDisplay}
				</form>
			</div>
		);
	}
}