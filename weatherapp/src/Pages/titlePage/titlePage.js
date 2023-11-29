import React, { useState, useContext, useEffect } from "react";
import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import styles from "./titlePage.module.css";
import { ThemeContext } from "../../contexts/themeContext";
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

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
            <div className={styles.mainText}>
                Please enable location to automatically search for your current location or you can search for a city name in the search box below.
            </div>
            <Autocomplete
                onInputChange={handleInputChange}
                onChange={handleCitySelect}
                className={styles.searchBar}
                selectOnFocus
                loading={searchIsLoading}
                options={citySuggestions}
                getOptionLabel={(option) => option.label}
                noOptionsText="Search City Name"
                popupIcon={<SearchIcon />}
                sx={{
                    // prevent icon from rotating 180 deg
                    '.MuiAutocomplete-popupIndicator': {
                        transform: 'none',
                    },
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search City"
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme === "light" ? '#303042' : '#ffffff',
                                },
                                '&:hover fieldset': {
                                    borderColor: theme === "light" ? '#303042' : '#ffffff',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme === "light" ? '#303042' : '#ffffff',
                                    color: theme === "light" ? '#303042' : '#ffffff'
                                },
                            },
                            '.MuiButtonBase-root': {
                                color: theme === "light" ? '#303042' : '#ffffff',
                            },
                            '& .MuiInputBase-input': {
                                color: theme === "light" ? '#303042' : '#ffffff',
                            },
                        }} InputLabelProps={{
                            style: {
                                color: theme === "light" ? '#303042' : '#ffffff',
                            },
                        }} />
                )} />
        </div>
    )
}

export default TitlePage;