import{ useEffect,useState} from 'react';
import { CurrentWeather, Location, Weather } from '../../models/weather';
import { Subscription } from 'rxjs';
import WeatherService from '../../services/weatherService';
import { Typography } from '@mui/material';
import CurrentDetails from './CurrentDetails';
import './CurrentInfo.css'
import { SymbolsPhrases } from '../../models/constants';

interface CurrentInfoProps{
    locationInfo : Location | null
}

const CurrentInfo = (props:CurrentInfoProps) => {
  let weatherService = new WeatherService();
  const [currentInfo,setCurrentInfo] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  let currentSub: Subscription;

  const getIconURL = (symbol)=>{
    return `/image/symbols/${symbol}.png`
  }
  useEffect(() => {
    if (currentSub) {
      currentSub.unsubscribe();
    }
    if(props.locationInfo?.id){
      currentSub = weatherService.getCurrentInfo(props.locationInfo?.id).subscribe({
        next: (data: CurrentWeather) => {
          setCurrentInfo(data.current);
        },
        error: (err) => {
          setError(err.message);
        },
    });
    }
  }, [props.locationInfo?.id]);
 
    return (
        currentInfo && (
          <div className="flex justify-center flex-col">   
              <div className="mt-4 basis-[40%] ">
                <div className='flex justify-center align-start'>
                  <img src={getIconURL(currentInfo.symbol)} alt={currentInfo.symbol} className='weather-symbol'/>
                  <Typography variant="h3">
                    {currentInfo.temperature}{'\u00b0'}C
                  </Typography>
                  
                </div>
                <div className='flex items-center justify-center'>
                    {props.locationInfo?.name}, {props.locationInfo?.country}
                  </div>
                <div className='text-xl text-center italic'>
                  {SymbolsPhrases[currentInfo.symbol.substring(1)]}
                </div>
              </div> 
              <div className="mt-4 basis-[50%]">
                  <CurrentDetails currentInfo={currentInfo}/>
              </div>
          </div>
        )
        
    )
}

export default CurrentInfo