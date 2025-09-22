import React, {useState} from "react";
import './App.css';
import axios from "axios";

function App() {
    const [cityData, setCityData] = useState("");

    const cities = [
        {id: "1", name: "توکیو", lat: "35.6895", lon: "139.6917"},
        {id: "2", name: "قاهره", lat: "30.0444", lon: "31.2357"},
        {id: "3", name: "سائو پائولو", lat: "-23.5505", lon: "-46.6333"},
        {id: "4", name: "تورنتو", lat: "43.6511", lon: "-79.3832"},
        {id: "5", name: "استانبول", lat: "41.0082", lon: "28.9784"},
        {id: "6", name: "سیدنی", lat: "-33.8688", lon: "151.2093"}
    ];

    const apiKey = "b3fc54b9c026b7c396a2d47583049586";

    const handleChangeSelect = (e) => {
        const {value} = e.target;
        fetchApi(JSON.parse(value))
    }

    async function fetchApi(city) {
        try {
            const getApi = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`);
            console.log(getApi.data)
            setCityData(getApi.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <select onChange={handleChangeSelect}>
                {
                    cities.map((city) => (
                        <option key={city.id} value={JSON.stringify(city)}>{city.name}</option>
                    ))
                }
            </select>
            <div>city: {cityData?.name}</div>
            <div>wind speed: {cityData?.wind?.speed}</div>
            <div>temp: {cityData?.main?.temp}</div>
        </div>
    )
}

export default App
