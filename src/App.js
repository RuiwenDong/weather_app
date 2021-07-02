import React, {useState, useEffect} from 'react';
import './App.css';
import {getWeatherData} from './data/weatherapi';
import Particles from 'react-particles-js'

function App() {
  const [weatherdata, setWeatherdata] = useState(null);
  const [city, setCity] = useState('Ottawa');
  const [ottawa, setOttawa] = useState(null);
  const [beijing, setBeijing] = useState(null);
  const [toronto, setToronto] = useState(null);
  const [irvine, setIrvine] = useState(null);
  const [alaska, setAlaska] = useState(null);
  const [temp, setTemp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(true);

  const getData = async () => {
    try{
      const data = await getWeatherData(city);
      setWeatherdata(data);
      setLoading(false);   //loading
      const data1 = await getWeatherData('Ottawa');
      setOttawa(data1);
      const data2 = await getWeatherData('Beijing');
      setBeijing(data2);
      const data3 = await getWeatherData('Toronto');
      setToronto(data3);
      const data4 = await getWeatherData('Irvine');
      setIrvine(data4);
      const data5 = await getWeatherData('Alaska');
      setAlaska(data5);
      console.log(data); 
      console.log(data1);
    }catch(error){
      console.log(error.message);
      setLoading(false);
    }
  }

  //toggle switch for Celsius and Fahrenheit
  const handleClick = () => {
    if(toggle === false){
      setTemp(Math.round(weatherdata.main.temp - 273.15)+ '°C');
      setToggle(true);
      console.log('f to c');
    }
    if(toggle === true){
      setTemp(Math.round((weatherdata.main.temp - 273.15) *9/5 +32) + '°F');
      setToggle(false);
      console.log('c to f');
    }
  }

  const updateInfo = (cityName) =>{
    setCity(cityName);
  }
 
  //add side effect function
  useEffect(() => {
    getData();
  }, [city]);
  
  return (
    <div className="main">                     {/* Particle background */}                                
      <Particles id='paricle-canvas'                                    
    params={{
	    "particles": {
	        "number": {
	            "value": 100
	        },
	        "size": {
	            "value": 3
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        }
	    }
	}} />
      <div className="App">
      <div className="card">
      <header className="header">
        <div className="title">
        <b>Weather</b>
        </div>
        <label className="switch" >                  {/* toggle switch section */}
          <input type="checkbox" id="togBtn" />
            <div className="slider round" onClick={handleClick}>
              <span className="f_degree">&deg;F</span>
              <span className="c_degree">&deg;C</span>
            </div>
        </label>
      </header>

      {loading ? (
       <div className="loader-container"> 
       <b>Please wait, data is loading...</b>
       </div>
      ) : (
        <>
        {weatherdata && ottawa && beijing && toronto && irvine && alaska !== null ? (
        <div className="content">
        <div className="container">
        <table className=" weather-col tab1">
            <tbody>
            <tr><td className="tab-title" >
            <b>Favorite Locations</b>
            </td></tr>
            <tr><td className="city-lists" onMouseOver={()=>{updateInfo('Ottawa')}}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/${ottawa.weather[0].main}.png`} alt="weatherimg" className="weatherimg" />   
            {/* img path is fully controlled by weather conditions, which is also same as the img file name */}
              <span className="city">Ottawa, Canada</span>
            </td></tr>
            <tr><td className="city-lists" onMouseOver={()=>{updateInfo('Beijing')}}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/${beijing.weather[0].main}.png`} alt="weatherimg" className="weatherimg" />
              <span className="city">Beijing, China</span>
            </td></tr>
            <tr><td className="city-lists" onMouseOver={()=>{updateInfo('Toronto')}}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/${toronto.weather[0].main}.png`} alt="weatherimg" className="weatherimg" />
              <span className="city">Toronto, Canada</span>
            </td></tr>
            <tr><td className="city-lists" onMouseOver={()=>{updateInfo('Irvine')}}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/${irvine.weather[0].main}.png`} alt="weatherimg" className="weatherimg" />
              <span className="city">Irvine, United States</span>
            </td></tr>
            <tr><td className="city-lists" onMouseOver={()=>{updateInfo('Alaska')}}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/${alaska.weather[0].main}.png`} alt="weatherimg" className="weatherimg" />
              <span className="city">Alaska, United States</span>
            </td></tr>
            <tr className="emp"></tr>
            </tbody>
          </table>

          <table className=" tab2 weather-col">
          <tbody>
          <tr><td className="tab-title"><b>{weatherdata.name}, {weatherdata.sys.country}</b></td></tr>
          <tr className="detail"><td>
           <img src={`${process.env.PUBLIC_URL}/assets/images/${weatherdata.weather[0].main}.png`} alt="weatherimg" className="weatherimg" />
          <div className="detail-info">  {/* Ternary operator control the display of Celsius or Fahrenheit */}
            <div className="temp">{toggle === true 
            ? Math.round(weatherdata.main.temp - 273.15)+ '°C' 
            : Math.round((weatherdata.main.temp - 273.15) *9/5 +32) + '°F'}</div> 
            <span>{weatherdata.weather[0].description}</span>
          </div> 
          </td>
          </tr>
          </tbody>
          </table>
        </div>
      </div>
      ) : null}
        </>
      )}
    </div>
      </div>
    </div>
  );
}

export default App;