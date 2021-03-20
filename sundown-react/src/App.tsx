import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Weather, { WeatherData } from "./components/weather";
import axios from 'axios';
import ErrorBoundary from './components/error-boundary';

function App() {
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [data, setData] = useState<WeatherData>({ main: undefined, sys: { sunrise: 0, sunset: 0 } });
    const [geoPermission, setGeoPermission] = useState("prompt");

    const getLocation = () => {
        const options = {
            maximumAge: 10000,
            enableHighAccuracy: true,
        };

        const successCallback: PositionCallback = (position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        };

        const errorCallback: PositionErrorCallback = (error) => console.warn("Something went wrong 🤷‍♂️");

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
    };

    const fetchData = async () => {
        const url = `${import.meta.env.VITE_APP_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=${import.meta.env.VITE_APP_API_KEY}`;
        const result = await axios.get(url);
        setData(result.data);
        console.log("result", result.data);
    };

    useEffect(() => {
        // ask permission
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
            const { state } = result;
            switch (state) {
                case "prompt": {
                    getLocation();
                    break;
                }
                case "granted": {
                    getLocation();
                    break;
                }
                case "denied": {
                    break;
                }
            }
            setGeoPermission(state);

            result.onchange = function() {
                setGeoPermission(state);
            };
        });
    }, [geoPermission]);

    useEffect(() => {
        if (lat !== 0 && lon !== 0) {
            fetchData();
        }
    }, [lat, lon]);

    const renderDeniedPermission = () => {
        return (<div>Y u no let me have permission?</div>)
    }

    const renderAskForPermission = () => {
        return (<div>Can I haz permission?</div>)
    }

    const renderHasPermission = () => {
        return (<div>I promise, I will not abuse your permission. 🦹‍♂️</div>)
    }

    const renderDefault = () => {
        switch (geoPermission) {
            case "denied":
                return renderDeniedPermission();
            case "prompt":
                return renderAskForPermission();
            case "granted":
                return renderHasPermission();
            default:
                throw Error("Weird permission state");
        }
    }
    return (
        <ErrorBoundary>
            <div className="App">
                {(typeof data.main != 'undefined') ? (
                    <Weather weatherData={data}/>
                ) : renderDefault() }
            </div>
        </ErrorBoundary>
    )
}

export default App
