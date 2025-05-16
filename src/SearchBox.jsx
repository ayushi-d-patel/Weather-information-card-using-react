import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';
import { red } from '@mui/material/colors';

export default function SearchBox({updateInfo}){
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    const VITE_API_URL=import.meta.env.VITE_API_URL;
    const VITE_API_KEY=import.meta.env.VITE_API_KEY;

console.log("API URL:", import.meta.env.VITE_API_URL);
console.log("API KEY:", import.meta.env.VITE_API_KEY);


    let getWeatherInfo = async () => {
  try {
    let response = await fetch(`${VITE_API_URL}?q=${city}&appid=${VITE_API_KEY}&units=metric`);
    if (!response.ok) {
      // e.g., 404 city not found, etc.
      setError(true);
      return null;  // or throw new Error("City not found");
    }
    let jsonResponse = await response.json();
    let result = {
      city: city,
      temp: jsonResponse.main.temp,
      tempMin: jsonResponse.main.temp_min,
      tempMax: jsonResponse.main.temp_max,
      humidity: jsonResponse.main.humidity,
      feelsLike: jsonResponse.main.feels_like,
      weather: jsonResponse.weather[0].description
    };
    console.log(result);
    setError(false);  // reset error if successful
    return result;
  } catch (err) {
    console.error("API call failed:", err);
    setError(true);
    return null;
  }
};



    let handleChange=(e)=>{
        setCity(e.target.value);
    }

    let handleSubmit=async(e)=>{
        try{
        e.preventDefault();
        console.log(city);
        setCity("");
        let newInfo=await getWeatherInfo();
        updateInfo(newInfo);
        }catch(err){
            setError(true);
        }
       
    }

    return(
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" 
            variant="outlined" 
            required 
            value={city}
            onChange={handleChange}
            />
            <br /><br />
            <Button variant="contained" type="submit">Search</Button>
            {error && <p style={{color:"red"}}>No such place exists</p>}
            </form>
        </div>
    )
}