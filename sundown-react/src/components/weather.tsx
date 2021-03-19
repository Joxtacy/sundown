import React, { useEffect, useState } from "react";
import "./weather.css";
import Sunset from "./sunset";
import dayjs from "dayjs";

export interface WeatherData {
    name?: string
    sys: {
        sunrise: number
        sunset: number
    }
    main?: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        temp_min: number
    }
}

export interface WeatherProps {
    weatherData: WeatherData
}

function Weather({ weatherData }: WeatherProps) {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().getTime());
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    const getCurrentTime = () => {
        const date = new Date(currentTime);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const time = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
        return time;
    }

    const getTimeDifference = (time1: number, time2: number) => {
        return new Date(Math.abs(time1 - time2));
    }

    const isItTimeForSunset = () => {
        const diff = (weatherData.sys.sunset * 1000) - new Date().getTime();
        return diff > 0;
    }

    return (
        <section className={"weather"}>
            <div className={"title"}>{weatherData.name}</div>
            <div className={"card time-sunset"}>🌆 {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</div>
            <div className={"card time-left"}>⌛️ {getTimeDifference(weatherData.sys.sunset * 1000, getCurrentTime()).toLocaleTimeString()}</div>
            {/* <h2>Sunrise is: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</h2> */}
            {/* <h2>Time until sunrise: {getTimeDifference(weatherData.sys.sunrise * 1000, getCurrentTime()).toLocaleTimeString()}</h2> */}
            {/* <h2>Current time is: {new Date(currentTime).toLocaleTimeString()}</h2> */}
            {/* <h2>Is it time for sunset? {isItTimeForSunset() ? "Yes" : "No"}</h2> */}
            <Sunset timeLeft={getTimeDifference(weatherData.sys.sunset * 1000, getCurrentTime()).getTime()}/>
        </section>
    );
}

export default Weather;
