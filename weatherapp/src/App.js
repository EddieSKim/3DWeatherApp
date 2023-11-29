import React from "react";
import { Routes, Route } from 'react-router-dom';
import WeatherForm from "./Pages/mainPage/weatherForm";
import TitlePage from "./Pages/titlePage/titlePage";
import NavBar from "./components/navBar/navBar";
import { ThemeProvider } from "./contexts/themeProvider";

function App() {

  return (
    <ThemeProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/app" element={<WeatherForm />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;