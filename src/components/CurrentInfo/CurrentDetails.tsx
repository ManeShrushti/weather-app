import React, { useEffect, useState } from 'react';
import { CurrentWeather, Location } from '../../models/weather';
import { Subscription } from 'rxjs';
import WeatherService from '../../services/weatherService';
import { Card, Grid, Paper, Typography, iconClasses, styled } from '@mui/material';
import { CurrentDetailsInfo,IconsMap} from '../../models/constants';

const CurrentDetails = (props) => {
    
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'rgba(255, 255, 255,0.3)',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
    height: '100%',
    borderRadius: '8px' 
  }));
  const [detailsArray,setDetailsArray] = useState([]);
  let Icons = Object.assign({},IconsMap);
  useEffect(() => {
  
    if(props.currentInfo){
      let details = CurrentDetailsInfo.map((dt) => {
        dt.value = props.currentInfo[dt.key]  
        if(dt.key === 'relHumidity'){
          dt.subtitle = `The dew point is ${props.currentInfo.dewPoint}\u00b0 right now`
        }
        
        return dt
      });
      setDetailsArray(details);
    }
  }, [props.currentInfo,props.tempUnit]);

  const getIcon = (key) =>{
    let IconComponent = IconsMap[key];
    return (
      <IconComponent/>
    )
  }
  return (
    detailsArray.length > 0 && (
      <Grid container spacing={3} className='h-full'>
      {detailsArray.map((dt,index) => (
          <Grid item xs={6} key={index.toString()} >
          <Item elevation={4}>
              <div className='h-full flex flex-col items-start p-2'>
                <div className='mb-2 text-lg flex justify-center'>
                  {getIcon(dt.icon)}<span className='desc-title'>{dt.title}</span>
                </div>
                <div  className='text-2xl'>
                    {dt.value}{dt.key === 'feelsLikeTemp' ? props?.tempUnit : dt.unit}
                </div>
                <div className='text-xs text-left'>
                   {dt.subtitle}
                </div>
              </div>
          </Item>
        </Grid>

      ))}  
      </Grid>
    )
    
  )
}

export default CurrentDetails
