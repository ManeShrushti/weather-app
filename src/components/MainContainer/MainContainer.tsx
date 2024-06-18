import { AppBar, Card, Switch, Toolbar, Typography } from '@mui/material'
import React from 'react'
import './MainContainer.css';
import LocationInfo from '../LocationInfo/LocationInfo'
import { DForecast, Location } from '../../models/weather';
import HourlyForecast from '../Forecast/HourlyForecast';
import DailyForecast from '../Forecast/DailyForecast';
import MetaInfo from '../Meta/MetaInfo';
import WeatherService from '../../services/weatherService';

const MainContainer = (props) => {
  const [locationData,setLocationData] = React.useState<Location | null>(null);
  const [metaData,setMetaData] = React.useState<DForecast | null>(null);
  const [isDay,setIsDay] = React.useState<boolean>(true);
  const setLocationDetails = (locationData: Location) => {
    setLocationData(locationData);
  };
  const [tempCtrl, setTempCtrl] = React.useState(false);

  const setIsDayInfo = (isDay: boolean)=>{
    setIsDay(isDay);
    props?.setBackground(isDay);
  }
  const handleTempCtrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempCtrl(event.target.checked);
  };
  const setMetaInfo = (DForecast: DForecast) => {
    setMetaData(DForecast);
  };
  return (
    <div className='flex w-full h-full flex-col'>
      <div>
        <AppBar position="static" sx={{backgroundColor: !isDay ? '#1f233f': '#1976d2'}}>
          <Toolbar> 
            <div className='flex justify-between w-full'>
              <div className='flex'>
                <img src="/image/loading-logo.svg" alt="loading-clouds" className='weather-symbol'/>
                <span className='text-[1.7rem]'>WeatherCast</span>
              </div>
              <div className='flex items-center'>
                {'\u00b0'}C <Switch
                    checked={tempCtrl}
                    color="default"
                    onChange={handleTempCtrlChange}
                    inputProps={{ 'aria-label': 'controlled' }} 
                    /> {'\u00b0'}F 
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div className='cards-holder p-6'>
        <div className='info-container basis-[40%] mr-4'>
          <Card variant="outlined" className="main-cont-card">  
              <LocationInfo setLocationDetails={setLocationDetails} tempUnit={tempCtrl ? 'F' : 'C'}/>
          </Card> 
        </div>
        <div className='info-container flex-col basis-[60%]  ml-4'>
          <Card variant="outlined" className="main-cont-card mb-5 basis-[40%] flex justify-center">  
             <HourlyForecast locationData={locationData} tempUnit={tempCtrl ? 'F' : 'C'} setIsDay={setIsDayInfo}/>
          </Card>
          <Card variant="outlined" className="main-cont-card mb-5 basis-[40%] flex justify-center">  
             <DailyForecast locationData={locationData} setMetaInfo={setMetaInfo} tempUnit={tempCtrl ? 'F' : 'C'}/>
          </Card>
         <MetaInfo metaInfo={metaData}/>
          
        </div>
    </div>
    </div>
    
  )
}

export default MainContainer
