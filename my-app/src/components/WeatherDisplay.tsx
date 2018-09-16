import * as React from 'react';
import { Component, Fragment } from 'react';
import { autobind } from 'core-decorators';


import "./WeatherDisplay.css"

interface Props {
	weatherData: any;
}

interface State {
	celsius: boolean;
}

@autobind
export default class WeatherDisplay extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			celsius: true
		};
	}

	toggleTemp() {
		const { celsius } = this.state;
		this.setState({ celsius: !celsius });
	}

	render() {
		const { weatherData } = this.props;
		const { celsius } = this.state;
		const degrees = celsius ? (
			<p>{weatherData.main.temp - 273.15} degrees Celsius</p>
		) : (
			<p>{Math.round(weatherData.main.temp * 9/5) - 459.67} degrees Fahrenheit</p>
		);

		return (
			<Fragment>
				<h3>
					Current conditions in {weatherData.name},{' '}
					{weatherData.sys.country}
				</h3>
				<h2>{weatherData.main.temp - 273.15}°</h2>
				{degrees}
			</Fragment>
		);
    }
}
