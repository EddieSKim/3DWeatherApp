import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import styles from "./weatherForm.module.css";
import { Link } from "react-router-dom";
import WeatherBlock from "../../components/weatherBlock/weatherBlock";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const tempWeather = [
    {
        temp: 10,
        speed: 20,
    },
    {
        temp: 12,
        speed: 20,
    },
    {
        temp: 14,
        speed: 20,
    },
    {
        temp: 1,
        speed: 20,
    },
]

function WeatherForm() {

    const [searchQuery, setSearchQuery] = useState("");
    const [weatherList, updateWeatherList] = useState([]);
    const [weatherInfo, setWeatherInfo] = useState({});
    const key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        // fetch(`https://api.openweathermap.org/data/2.5/weather?q=Calgary&units=metric&APPID=${key}`)
        //     .then(res => res.json())
        //     .then(result => {
        //         setWeather(result);
        //         setSearchQuery("");
        //     })

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=51.0447&lon=-114.0719&exclude=minutely,hourly&units=metric&appid=${key}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.data)
                setWeatherInfo(data)
                updateWeatherList([data])
            })
            .catch(err => console.error(err));
    }, []);

    const searchChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(weatherList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        updateWeatherList(items);
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
            <Button>Collapse All</Button>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {weatherList.map((item, index) => (
                                <Draggable key={item.lat} draggableId={item.lat.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {item.temp}
                                            <WeatherBlock />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Button>
                <Link to="/NewLocation">
                    Add New Location
                </Link>
            </Button>
        </div>
    )
}

export default WeatherForm;