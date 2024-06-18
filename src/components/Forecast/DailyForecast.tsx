import { Subscription } from 'rxjs';
import WeatherService from '../../services/weatherService';
import './HourlyForecast.css';
import {useState,useEffect} from 'react'
import { Location, DForecast, DailyForecastInfo } from '../../models/weather';
import { Typography } from '@mui/material';
import moment from 'moment';
import { AccessTimeOutlined, CalendarTodayOutlined } from '@mui/icons-material';

interface DailyInfoProps{
    locationData : Location | null,
    setMetaInfo: (metaData:DForecast) => void,
    tempUnit: string | 'C',
}

const DailyForecast = (props:DailyInfoProps) => {
  let weatherService = new WeatherService();
  const [dailyForecast,setDailyForecast] = useState<DForecast[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  let currentSub: Subscription;

  const getIconURL = (symbol)=>{
    return `/image/symbols/${symbol}.png`
  }
  useEffect(() => {
    if (currentSub) {
      currentSub.unsubscribe();
    }
    if(props.locationData?.id){
      currentSub = weatherService.getForecast(props.locationData?.id,'daily',7,props.tempUnit).subscribe({
        next: (data: DailyForecastInfo) => {
          setDailyForecast(data.forecast);
          props.setMetaInfo(data.forecast[0]);
        },
        error: (err) => {
          setError(err.message);
        },
      });
    }
  }, [props.locationData?.id,props.tempUnit]);
  return (
    dailyForecast && (
    <div className='flex justify-start w-full p-2 flex-col'>
        <div className='align-middle text-left'> <CalendarTodayOutlined sx={{fontSize: '1em',marginBottom: '0.25em'}}/> Daily Forecast</div>
        <div className='forecast-container'>
     
            {dailyForecast.map((fc,index) => {
                return (
                    <div className='forecast-box' key={index.toString()}>
                        <div className='text-[0.75em]'>{index === 0 ? 'Today' : moment.parseZone(fc.date).format("ddd")}</div>
                        <div className='text-xs'>
                            <div>Min: {fc.minTemp}{'\u00b0'}{props.tempUnit} </div>
                            <div>Max: {fc.maxTemp}{'\u00b0'}{props.tempUnit}</div>
                        </div>
                        <img src={getIconURL(fc.symbol)} alt={fc.symbol} className='forecast-symbol'/>
                </div>
                );
            })}
        </div>
    </div>
   
  ))
}

export default DailyForecast
