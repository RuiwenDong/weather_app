import axios from 'axios';

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = '9ffb30474d8b85b71162ba4e03034feb';

export const getWeatherData = async (cityname) => {
    try{
        const {data} = await axios.get(baseUrl + `q=${cityname}&appid=${apiKey}`);
        return data;
    }catch(error){
        throw error;
    }
}