import httpApi from './http.api';
import { APIKey } from '../constants/openweather';

export interface WeatherData {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    id: number;
    name: string;
    cod: number;
}

export interface Clouds {
    all: number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface Main {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

export interface Sys {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Wind {
    speed: number;
    deg: number;
}


class WeatherAPi {
    /**
     * City name, state code and country code divided by comma, Please, refer to ISO 3166 
     * for the state codes or country codes.You can specify the parameter not only in English. 
     * In this case, the API response should be returned in the same language as the language of 
     * requested location name if the location is in our predefined list of more than 200,000 locations.
     * 
     * @param cityName Name of the city
     */
    async getWeatherDataByCityName(cityName: string): Promise<WeatherData> {
        const weatherData = httpApi.get(`/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`)
        return weatherData;
    }
}

export default new WeatherAPi();
