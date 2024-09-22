import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import searchIcon from '../assets/search.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'

function Weather() {

    const [weatherData, setWeatherData] = useState(false)
    const inputRef = useRef()


    const search = async(city)=>{
        if(city === ""){
            alert("Enter city name")
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=da6c3daeda9fbbe74ac041deffb47da5`

            const response = await fetch(url)
            const data = await response.json()
            console.log(data)

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: data.main.temp,
                location: data.name,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

            })
        } catch (error) {
            alert("City does not exist, please try again!")
            setWeatherData(false)

        }
    }

    useEffect(()=>{
        search("Durban")
    },[])
  return (
    <div className='weather'>
        <div className='search-bar'>
            <input type='text' placeholder='Search' ref={inputRef}/>
            <img src={searchIcon} alt='search icon' onClick={()=>search(inputRef.current.value)}/>
        </div>

        {weatherData?<>
            <img src={weatherData.icon} alt='Weather image' className='weather-icon' />
            <p className='temp'>{weatherData.temp}°C</p>
            <p className='location'>{weatherData.location}</p>

            <div className='weather-data'>
            <div className="col">
                    <img src={humidityIcon} alt="humidity" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humididy</span>
                    </div>
                </div>
                <div className="col">
                    <img src={windIcon} alt="wind" />
                    <div>
                        <p>{weatherData.windSpeed} Km/h</p>
                        <span>Wind speed</span>
                    </div>
                </div>
            </div>
        </>:<></>}
    </div>
  )
}

export default Weather