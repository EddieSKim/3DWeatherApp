import React from "react";
import { Routes, Route } from 'react-router-dom';
import WeatherForm from "./Pages/mainPage/weatherForm";
import NewLocationForm from "./Pages/newLocationForm/newLocationForm";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<WeatherForm />}/>
        <Route path="/NewLocation" element={<NewLocationForm />} />
      </Routes>
    </>
  );
}

export default App;