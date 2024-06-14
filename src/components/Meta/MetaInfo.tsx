import { Card, Slider } from '@mui/material';
import './MetaInfo.css';
import {useState,useEffect} from 'react'
import { DForecast, Location } from '../../models/weather';
import { Brightness2, Brightness6, TrackChanges } from '@mui/icons-material';
import moment from 'moment';

export interface MetaInfoProps {
    metaInfo: DForecast | null;
}
const MetaInfo = (props:MetaInfoProps) => {
    const [metaData,setMetaData] = useState<DForecast>(null); 
    useEffect(()=>{
        setMetaData(props?.metaInfo)
    },[props?.metaInfo])
  return (
    <div className='flex basis-[30%] justify-evenly'>
        <Card variant="outlined" className="main-cont-card mb-5 mr-4 basis-[50%] flex justify-center">  
            {metaData && (
                    <div className='flex flex-1 p-4 flex-col'>
                            <div className='flex justify-evenly flex-1'>  
                                
                                <div className='mr-4'><TrackChanges /> UV Index
                                 <Slider defaultValue={metaData.uvIndex} aria-label="UV Index" color="primary" />
                                </div>
                                <div><Brightness6 sx={{color: '#EDC11B'}}/> Solar Radiation
                                <div>{metaData.solarRadiationSum}</div>
                                </div>
                            </div> 
                            <div className='flex justify-evenly flex-1'>   
                                <div className='mr-4'><Brightness2 className='rotate-90' sx={{color: '#C6C5C5'}}/>
                                        Moonrise <div>{moment(metaData.moonrise,"HH:mm:ss").format("hh:mm A")}</div>
                                </div>
                                <div><Brightness2 className='rotate-[270deg]' sx={{color: '##C6C5C5'}}/>
                                        Moonset<div>{moment(metaData.moonset,"HH:mm:ss").format("hh:mm A")}</div>
                                </div>
                            </div>
                        </div>
                )}
        </Card>
        <Card variant="outlined" className="main-cont-card mb-5 basis-[50%] flex justify-center">  
            {metaData && (
                <div className='flex flex-1 p-4 flex-col'>
                        <div className='flex justify-evenly flex-1'>   
                            <div className='mr-4'><Brightness6 className='rotate-90' sx={{color: '#EDC11B'}}/>
                                Sunrise <div>{moment(metaData.sunrise,"HH:mm:ss").format("hh:mm A")}</div>
                            </div>
                            <div><Brightness6 className='rotate-[270deg]' sx={{color: '#EDC11B'}}/>
                                Sunset  <div>{moment(metaData.sunset,"HH:mm:ss").format("hh:mm A")}</div>
                            </div>
                        </div> 
                       <div className='flex justify-evenly flex-1'>   
                            <div className='mr-4'><Brightness2 className='rotate-90' sx={{color: '#EDC11B'}}/>
                                  Moonrise <div>{moment(metaData.moonrise,"HH:mm:ss").format("hh:mm A")}</div>
                            </div>
                            <div><Brightness2 className='rotate-[270deg]' sx={{color: '#EDC11B'}}/>
                                  Moonset<div>{moment(metaData.moonset,"HH:mm:ss").format("hh:mm A")}</div>
                            </div>
                        </div>
                 </div>
            )}
        </Card>
    </div>
  )
}

export default MetaInfo
