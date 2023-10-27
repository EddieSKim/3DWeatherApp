import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import styles from "./weatherForm.module.css";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function WeatherForm() {

    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [weatherList, updateWeatherList] = useState([]);
    const [weatherInfo, setWeatherInfo] = useState({});
    const [locationName, setLocationName] = useState("");
    const key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=51.0447&lon=-114.0719&exclude=minutely,hourly&units=metric&appid=${key}`)
            .then(res => res.json())
            .then(data => {
                data.daily.shift();
                fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${data.lat}&lon=${data.lon}&limit=5&appid=${key}`)
                    .then(res => res.json())
                    .then(data => {
                        setLocationName(data[0].name);
                    })
                    .catch(err => console.error(err))
                setWeatherInfo(data);
                updateWeatherList([data]);
                setIsLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    const searchChange = (event) => {
        setSearchQuery(event.target.value);
    }

    // const handleDragEnd = (result) => {
    //     if (!result.destination) return;

    //     const items = Array.from(weatherList);
    //     const [reorderedItem] = items.splice(result.source.index, 1);
    //     items.splice(result.destination.index, 0, reorderedItem);
    //     updateWeatherList(items);
    // }

    return (
        <div className={styles.container}>
            {/* <TextField
                onChange={searchChange}
                value={searchQuery}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                }} /> */}
            {/* <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {weatherList.map((item, index) => (
                                <Draggable
                                    key={item.lat}
                                    draggableId={item.lat.toString()}
                                    index={index}>
                                    {(provided) => (
                                        <div
                                            className={styles.draggableWrapper}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {item.temp}
                                            <WeatherBlock weather={weatherInfo} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext> */}
            <div className={styles.header}>
                <span>Weather App</span>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.navBarContainer}>
                    <div className={styles.navWrapper}>

                    </div>
                </div>
                <div className={styles.mainLocationContainer}>
                    <div className={styles.currentWeather}>
                        <TextField
                            className={styles.searchLocation}
                            onChange={searchChange}
                            value={searchQuery}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                            }} />
                        <div className={styles.currentWeatherWrapper}>
                            {
                                !isLoading ? (
                                    <div>
                                        <h1 className={styles.locationTitle}>
                                            {locationName}
                                        </h1>
                                        {/* <span>Current Temp: {weatherInfo && weatherInfo.current.temp}</span>
                                        <span>Feels like: {weatherInfo && weatherInfo.current.feels_like}</span> */}
                                    </div>
                                ) : (
                                    <div>
                                        Loading
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={styles.weatherInfo}>
                        <div className={styles.weatherInfoWrapper}>
                            <span>Air Conditions</span>
                            {
                                !isLoading ? (
                                    <div>
                                        <span>Humidity:</span>
                                    </div>
                                ) : (
                                    <div>
                                        Loading
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={styles.hourlyWeatherContainer}>
                        <div className={styles.hourlyWeatherWrapper}>
                            <span>Hourly Forecast</span>
                            {
                                !isLoading ? (
                                    <div>

                                    </div>
                                ) : (
                                    <div>
                                        Loading
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.weeklyWeatherContainer}>
                    <div className={styles.weeklyWeatherWrapper}>
                        <span>7-Day Forecast</span>
                        {
                            !isLoading ? (
                                <div>

                                </div>
                            ) : (
                                <div>
                                    Loading
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherForm;