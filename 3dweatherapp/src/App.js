import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

//https://api.openweathermap.org/data/2.5/weather
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// Good for using location service to find lat and long
// https://api.openweathermap.org/data/2.5/weather?q={searchQuery}&units=metric&APPID
// Good for searching
/* calgary default lat long = { 51.0447° N, 114.0719° W } */

function App() {
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
    console.log(weather);
  }, [])

  const searchChange = (event) => {
    setSearchQuery(event.target.value);
  }

  return (
    <div>
      <TextField onChange={searchChange} value={searchQuery} />
    </div>
  );
}

export default App;