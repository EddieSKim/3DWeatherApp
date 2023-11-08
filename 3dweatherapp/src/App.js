import React, { useContext } from "react";
import { Routes, Route } from 'react-router-dom';
import WeatherForm from "./Pages/mainPage/weatherForm";
import NewLocationForm from "./Pages/newLocationForm/newLocationForm";
import NavBar from "./components/navBar/navBar";
import { ThemeProvider } from "./contexts/themeProvider";

function App() {

  return (
    <ThemeProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<WeatherForm />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;