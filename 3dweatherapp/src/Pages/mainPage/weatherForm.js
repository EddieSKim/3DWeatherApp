import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import styles from "./weatherForm.module.css";
import { Link } from "react-router-dom";
import WeatherBlock from "../../components/weatherBlock/weatherBlock";


// https://api.openweathermap.org/data/2.5/weather
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// Good for using location service to find lat and long
// https://api.openweathermap.org/data/2.5/weather?q={searchQuery}&units=metric&APPID
// Good for searching
/* calgary default lat long = { 51.0447° N, 114.0719° W } */

function WeatherForm() {

    const [searchQuery, setSearchQuery] = useState("");
    const [weather, setWeather] = useState({});
    const key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        // fetch(`https://api.openweathermap.org/data/2.5/weather?q=Calgary&units=metric&APPID=${key}`)
        //   .then(res => res.json())
        //   .then(result => {
        //     setWeather(result);
        //     setSearchQuery("");
        //   })

        // fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=51.0447&lon=114.0719&exclude=minutely,hourly&appid=${key}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setWeather(data);
        //     });
        console.log(weather);
    }, [key, weather]);

    const searchChange = (event) => {
        setSearchQuery(event.target.value);
    }

    return (
        <div className={styles.container}>
            <h1>Weather App</h1>
            {/* <TextField
                onChange={searchChange}
                value={searchQuery}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                }} /> */}
            <WeatherBlock />
            <Button>
                <Link to="/NewLocation">
                    Add New Location
                </Link>
            </Button>
        </div>
    )
}

export default WeatherForm;