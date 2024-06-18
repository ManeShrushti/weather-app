import React from 'react'
import './Main.css';
import MainContainer from '../MainContainer/MainContainer';
const Main = () => {
  const [imageSrc, setImageSrc] = React.useState('/image/init_background_2.jpg');
  const setBackground = (isDay: boolean) => {
    isDay ? setImageSrc('/image/day_clouds.png') : setImageSrc('/image/night_clouds.jpeg');
  };
  return (
    <div>
        <div className="bg-container">
         <img className="bg-img" src={imageSrc} alt="Background" />
         <div className="bg-card-container">
            <MainContainer setBackground={setBackground}/>
        </div>
        </div>
        
    </div>
    
  )
}

export default Main
