import { Observable, catchError, from, map } from "rxjs";
import { CurrentWeather, DailyForecastInfo, HourlyForecastInfo, LocationData  } from "../models/weather";
import axios from "axios";

const API_KEY = "5d44bc0913msh2705c921f652c9dp123df8jsne936c1d9f15b";
const API_HOST = "foreca-weather.p.rapidapi.com";

// Using async fetch await and promise 
// export const fetchWeather = async (city: string): Promise<LocationData> => {
//     const response = await fetch(`https://${API_HOST}/location/search/${city}`, {
//       method: "GET",
//       headers: {
//         "x-rapidapi-host": API_HOST,
//         "x-rapidapi-key": API_KEY,
//       },
//     });
  
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
    
//     const data: LocationData = await response.json();
//     return data;
// };


class WeatherService {
    private baseUrl: string;
    constructor() {
      this.baseUrl = `https://${API_HOST}`;
    }
    getLocationInfo(city: string): Observable<LocationData> {
      const url = `${this.baseUrl}/location/search/${city}`;
      return from(
        axios.get<LocationData>(url, {
        headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
        }})
        ).pipe(
            map(response => response.data),
            catchError(error => {
                    throw new Error('Error fetching location data');
                })
        );
    }

    getCurrentInfo(id:number): Observable<CurrentWeather>{
      const url = `${this.baseUrl}/current/${id}`;
      return from(
        axios.get<CurrentWeather>(url, {
          headers: {
            'x-rapidapi-host': API_HOST,
            'x-rapidapi-key': API_KEY
          }
        })
        ).pipe(
            map(response => response.data),
            catchError(error => {
                    throw new Error('Error fetching location data');
                })
        );
    }

    getForecast(id:number,type:string,steps?:number): Observable<HourlyForecastInfo|DailyForecastInfo>{
      const url = `${this.baseUrl}/forecast/${type}/${id}`;
      return from(
        axios.get<HourlyForecastInfo|DailyForecastInfo>(url, {
          headers: {
            'x-rapidapi-host': API_HOST,
            'x-rapidapi-key': API_KEY
          },
          params:{
            'periods' : steps,
            'dataset' : type == 'daily' ? 'full' : 'standard'
          }
        })
        ).pipe(
            map(response => response.data),
            catchError(error => {
                    throw new Error('Error fetching location data');
                })
        );
    }

    
  }
  
  export default WeatherService;