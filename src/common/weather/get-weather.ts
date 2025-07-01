import axios from 'axios';
import { STADIUM_COORDS } from '../constants/stadium-coords';

const API_KEY = process.env.OPEN_WEATHER_API_KEY;

export interface WeatherResult {
  temperature: number;
  description: string;
}

export async function fetchWeatherByStadium(stadium: string): Promise<WeatherResult | null> {
  const coords = STADIUM_COORDS[stadium];
  if (!coords) return null;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=kr`;

  try {
    const { data } = await axios.get(url);
    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
    };
  } catch (e) {
    console.error(`[날씨 API 호출 실패]:`, e.message);
    return null;
  }
}
