import { LocationSearching, Search } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';
import React from 'react'
import './LocationInfo.css'
import WeatherService from '../../services/weatherService';
import {CurrentWeather, Location, LocationData, Weather} from '../../models/weather'
import { Subscription } from 'rxjs';
import CurrentInfo from '../CurrentInfo/CurrentInfo' 
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface LocationInfoProps {
  setLocationDetails: (locationData: Location) => void,
  tempUnit: string | 'C'
}


const LocationInfo = (props: LocationInfoProps) => {
  const [location,setLocation] = React.useState("");
  const [locationInfo,setLocationInfo] = React.useState<Location | null>(null);
 
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const weatherService = new WeatherService();
  let subscription: Subscription;

  const searchLocation = ()=>{
    setLoading(true);
    setError(null);

    // **USING SUBCRIPTIONS **//
    if (subscription) {
      subscription.unsubscribe();
    }
    subscription = weatherService.getLocationInfo(location).subscribe({
      next: (data: LocationData) => {
        if(data.locations.length){
          props.setLocationDetails(data.locations[0]);
          setLocationInfo(data.locations[0]);
        }
        else{
          setError('Location not found!');
        }
        setLoading(false);
      },
      error: (err) => {
        setError(err.message);
        setLoading(false);
      },
    });
    // **USING AWAIT AND TRY CATCH****//
    // try {
    //   const data = await fetchWeather(location);
    //   if(data.locations){
    //     const locData = data.locations[0];
    //     props.setLocationDetails(locData);
    //     setLocation("");
    //   }
    // } catch (error:any) {
    //   setError(error.message);
    //   setLocation("");
    // } finally {
    //   setLoading(false);
    // }
  }
  return (
    <div className='m-4 flex flex-col h-[95%]'>
          <div className='flex'>
            <TextField
              id="location-textfield"
              sx={{margin: '0 0.5rem'}}
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              variant="filled"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{marginTop: '0rem'}}>
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained" 
              sx={{marginLeft: '1rem' , padding: '0 1.5em 0 1.5em', textTransform: 'capitalize'}}
              onClick={searchLocation}
              startIcon={<Search />}
            >
              Search
            </Button>
        </div>
        <div className='h-[90%] flex justify-center items-center'>
            {loading && (
              <div className='flex w-100 items-center'>
                <object type="image/svg+xml" data="/image/loading.svg" className='loader'/>
              </div>
            
            )}
            {error && <div className='text-red-500'>Error: {error}</div>}
            {!loading && !error && (
              <CurrentInfo locationInfo={locationInfo} tempUnit={props.tempUnit}/>
            )}
        </div>
    </div>
   
  )
}

export default LocationInfo
