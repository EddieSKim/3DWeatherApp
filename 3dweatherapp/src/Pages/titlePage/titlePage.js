import React, { useState, useContext, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import styles from "./titlePage.module.css";
import { ThemeContext } from "../../contexts/themeContext";
import { useNavigate } from 'react-router-dom';

function TitlePage() {
    const mapTilerKey = process.env.REACT_APP_MAPTILER_API_KEY;
    const { theme } = useContext(ThemeContext);
    let timeOutId = null;
    const navigate = useNavigate();

    const [citySuggestions, setCitySuggestions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [selectedCity, setSelectedCity] = useState({});
    const [searchIsLoading, setSearchIsLoading] = useState(false);

    useEffect(() => {
        setSelectedCity({});
        //fetch the weather info of location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    navigate(`/app?lat=${latitude}&long=${longitude}`);
                },
                (error) => {
                    console.error(error);
                }
            )
        }

    }, [])

    useEffect(() => {
        setSearchIsLoading(true);
        if (inputValue) {
            fetch(`https://api.maptiler.com/geocoding/${inputValue}.json?fuzzyMatch=true&limit=3&key=${mapTilerKey}&autocomplete=true`)
                .then(res => res.json())
                .then(data => {
                    const cityNames = data.features.map(
                        feature => ({ label: feature.place_name, long: feature.geometry.coordinates[0], lat: feature.geometry.coordinates[1] })
                    );
                    setSearchIsLoading(false);
                    setCitySuggestions(cityNames);
                })
        }
    }, [inputValue])

    const handleCitySelect = (event, value) => {
        setSelectedCity(value);
        if (value) {
            // send params through url
            navigate(`/app?lat=${value.lat}&long=${value.long}`);
        }
    }

    const handleInputChange = (event, value, reason) => {
        // Clear ongoing timeout
        clearTimeout(timeOutId);

        // Check reason, if "input" then it is the user typing into search bar
        if (reason === "input") {
            // wait before setting inputValue to avoid making api call for each letter input
            timeOutId = setTimeout(() => {
                setInputValue(value);
            }, 1000)
        }
    }

    return (
        <div className={styles.main_container} data-theme={theme}>
            <Autocomplete
                className={styles.searchBar}
                onInputChange={handleInputChange}
                onChange={handleCitySelect}
                selectOnFocus
                loading={searchIsLoading}
                options={citySuggestions}
                getOptionLabel={(option) => option.label}
                noOptionsText="Search City Name"
                renderInput={(params) => (
                    <TextField {...params} label="City" variant="outlined" />
                )} />
        </div>
    )
}

export default TitlePage;