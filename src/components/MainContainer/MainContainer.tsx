import { AppBar, Card, Toolbar, Typography } from '@mui/material'
import React from 'react'
import './MainContainer.css';
import LocationInfo from '../LocationInfo/LocationInfo'
import { DForecast, Location } from '../../models/weather';
import HourlyForecast from '../Forecast/HourlyForecast';
import DailyForecast from '../Forecast/DailyForecast';
import MetaInfo from '../Meta/MetaInfo';

const MainContainer = () => {
  const [locationData,setLocationData] = React.useState<Location | null>(null);
  const [metaData,setMetaData] = React.useState<DForecast | null>(null);
  const setLocationDetails = (locationData: Location) => {
    setLocationData(locationData);
  };

  const setMetaInfo = (DForecast: DForecast) => {
    setMetaData(DForecast);
  };


  return (
    <div className='flex w-full h-full flex-col'>
      <div>
        <AppBar position="static">
          <Toolbar> 
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1}}
            >
              Weather
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div className='cards-holder p-6'>
        <div className='info-container basis-[40%] mr-4'>
          <Card variant="outlined" className="main-cont-card">  
              <LocationInfo setLocationDetails={setLocationDetails}/>
          </Card> 
        </div>
        <div className='info-container flex-col basis-[60%]  ml-4'>
          <Card variant="outlined" className="main-cont-card mb-5 basis-[40%] flex justify-center">  
             <HourlyForecast locationData={locationData} />
          </Card>
          <Card variant="outlined" className="main-cont-card mb-5 basis-[40%] flex justify-center">  
             <DailyForecast locationData={locationData} setMetaInfo={setMetaInfo}/>
          </Card>
         <MetaInfo metaInfo={metaData}/>
          
        </div>
    </div>
    </div>
    
  )
}

export default MainContainer
