import axios from 'axios';
import { STADIUM_COORDS } from '../constants/stadium-coords';
import { WeatherDescriptionMap } from '../constants/weather-description.map';

const API_KEY = process.env.OPEN_WEATHER_API_KEY;

export interface WeatherResult {
  description: string;
}

export async function fetchWeatherByStadium(stadium: string): Promise<WeatherResult | null> {
  const coords = STADIUM_COORDS[stadium];
  if (!coords) return null;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=ko`;

  try {
    const { data } = await axios.get(url);

    const englishDesc = data.weather[0].description;
    const translatedDesc = WeatherDescriptionMap[englishDesc] || englishDesc;
    return translatedDesc;
  } catch (e) {
    console.error(`[날씨 API 호출 실패]:`, e.message);
    return null;
  }
}
