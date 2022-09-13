import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";



const API_KEY = "c5b54a9f2edff5e3bf7481431d3b6e0e";


class App extends React.Component {

state = {
  temp: undefined,
  city: undefined,
  country: undefined,
  sunrise : undefined,
  sunset: undefined,
  pressure: undefined,
  error: undefined
}



gettingWeather = async (e) => {
  e.preventDefault();
let city = e.target.elements.city.value;


if(city){
  const API_URL = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
const data = await API_URL.json();

function timeConverter(UNIX_timestamp){
  let a = new Date(UNIX_timestamp * 1000);
  let hour = a.getHours();
  let min = "0" + a.getMinutes();
  let sec = "0" + a.getSeconds();
  let time = hour + ':' + min.substr(-2) + ':' + sec.substr(-2) ;

  return time;

}

let sunset = data.sys.sunset,
    sunrise = data.sys.sunrise;
let sunset_date = timeConverter(sunset);
let sunrise_date = timeConverter(sunrise);

this.setState({
temp: data.main.temp,
city: data.name,
country: data.sys.country,
sunrise: sunrise_date,
sunset: sunset_date,
pressure: data.main.pressure,
error: undefined
    });
  }
  else{
    this.setState({
      temp: undefined,
      city: undefined,
      country: undefined,
      sunrise: undefined,
      sunset: undefined,
      pressure: undefined,
      error: "Enter the name of the city"
    });
  }
}

    render() {
        return(
            <div>
                <Info/>
                <Form wMethod= {this.gettingWeather}/>
                <Weather
                temp={this.state.temp}
                city={this.state.city}
                country={this.state.country}
                sunrise={this.state.sunrise}
                sunset={this.state.sunset}
                pressure={this.state.pressure}
                error={this.state.error}
                />
            </div>
        );
    }
}

export default App;
