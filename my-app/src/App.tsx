import * as React from 'react';
import { Component } from 'react';
import './App.css';
import Weather from './components/Weather';



class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">				
					<h1 className="App-title">Welcome To WeatherApp</h1>
					<h1 className="App-title">Enter your city</h1>

				</header>

				<Weather />
			</div>
		);
	}
}


export default App;