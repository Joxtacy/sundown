import React, { useEffect, useState } from "react";
import "./weather.css";
import Sunset from "./sunset";

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
    const [sunsetDate, setSunsetDate] = useState(new Date(weatherData.sys.sunset * 1000))
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        setSunsetDate(new Date(weatherData.sys.sunset * 1000));
    }, [weatherData])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [])

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

    const getTimeDiffString = (date1: Date, date2: Date) => {
        let msec = new Date(date1.getTime() - date2.getTime()).getTime();
        if (msec > 0) {
            const hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            const mm = Math.floor(msec / 1000 / 60);
            msec -= mm * 1000 * 60;
            const ss = Math.floor(msec / 1000);
            msec -= ss * 1000;

            return `${hh} ${hh === 1 ? "hour" : "hours"}, ${mm} ${mm === 1 ? "minute" : "minutes"}, ${ss} ${ss === 1 ? "second": "seconds"} left`;
        } else {
            return "The sun has set";
        }
    };

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
            <div className={"card time-sunset"}>Sunset is at {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</div>
            {/* <div className={"card time-left"}>⌛️ {getTimeDifference(weatherData.sys.sunset * 1000, getCurrentTime()).toLocaleTimeString()}</div> */}
            <div className={"card time-left"}>⌛️ {getTimeDiffString(sunsetDate, currentDate)}</div>
            {/* <h2>Sunrise is: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</h2> */}
            {/* <h2>Time until sunrise: {getTimeDifference(weatherData.sys.sunrise * 1000, getCurrentTime()).toLocaleTimeString()}</h2> */}
            {/* <h2>Current time is: {new Date(currentTime).toLocaleTimeString()}</h2> */}
            {/* <h2>Is it time for sunset? {isItTimeForSunset() ? "Yes" : "No"}</h2> */}
            <Sunset timeLeft={(weatherData.sys.sunset * 1000) - currentDate.getTime()}/>
        </section>
    );
}

export default Weather;
