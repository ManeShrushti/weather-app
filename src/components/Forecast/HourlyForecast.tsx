import { Subscription } from 'rxjs';
import WeatherService from '../../services/weatherService';
import './HourlyForecast.css';
import {useState,useEffect} from 'react'
import { CurrentWeather, Weather,Location, HourlyForecastInfo, HForecast } from '../../models/weather';
import { Typography } from '@mui/material';
import moment from 'moment';
import { AccessTimeOutlined } from '@mui/icons-material';

interface ForecastProps{
    locationData : Location | null,
    tempUnit: string | 'C',
    setIsDay: (isDay: boolean) => void
}

const HourlyForecast = (props:ForecastProps) => {
  let weatherService = new WeatherService();
  const [hourlyForecast,setHourlyForecast] = useState<HForecast[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  let currentSub: Subscription;
  let tempUnit: string;
  const getIconURL = (symbol)=>{
    return `/image/symbols/${symbol}.png`
  }
  useEffect(() => {
    if (currentSub) {
      currentSub.unsubscribe();
    }
    if(props.locationData?.id){
      currentSub = weatherService.getForecast(props.locationData?.id,'hourly',12,props.tempUnit).subscribe({
        next: (data: HourlyForecastInfo) => {
          let symbol = data.forecast[0].symbol.charAt(0);
          props.setIsDay(symbol === 'd')
          setHourlyForecast(data.forecast);
        },
        error: (err) => {
          setError(err.message);
        },
      });
    }
  }, [props.locationData?.id,props.tempUnit]);
  return (
    hourlyForecast && (
    <div className='flex justify-start w-full p-2 flex-col'>
        <div className='align-middle text-left'> <AccessTimeOutlined sx={{fontSize: '1em',marginBottom: '0.25em'}}/> Hourly Forecast</div>
        <div className='forecast-container'>
     
            {hourlyForecast.map((fc,index) => {
                return (
                    <div className='forecast-box' key={index.toString()}>
                        <div className='text-[0.75em]'>{index === 0 ? 'Now' : moment.parseZone(fc.time).format("HH:mm")}</div>
                        <div className='text-md'>
                            {fc.temperature}{'\u00b0'}{props.tempUnit}
                        </div>
                        <img src={getIconURL(fc.symbol)} alt={fc.symbol} className='forecast-symbol'/>
                </div>
                );
            })}
        </div>
    </div>
   
  ))
}

export default HourlyForecast
