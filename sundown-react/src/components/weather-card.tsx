import React from "react";
import "./weather-card.css";

export interface Weather {
    description: string;
    id: number;
    icon: string;
    main: string;
}

export interface Temperatures {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_min: number;
    temp_max: number;
}

export interface WeatherCardProps {
    weather: Weather[];
    temps: Temperatures;
    location: string;
}

function WeatherCard({ weather, temps, location }: WeatherCardProps) {
    return (
        <div className={"weather-card"}>
            <span className={"weather-location"}>{location}</span>
            <div className={"weather-container"}>
                <span className={"weather-description"}>{weather[0].description}</span>
                {weather[0].icon !== "" && <img className={"weather-icon"} src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} />}
                <div className={"weather-temps-temp"}>
                    {`Temp: ${temps.temp.toFixed(1)}°C`}
                </div>
                <div className={"weather-temps-feelslike"}>
                    {`Feels like: ${temps.feels_like.toFixed(1)}°C`}
                </div>
                <div className={"weather-temps-humidity"}>
                    {`Humidity: ${temps.humidity}%`}
                </div>
            </div>
            <div className={"weather-temps"}>
            </div>
        </div>
    );
}

export default WeatherCard;
