import React from 'react'
import './Main.css';
import MainContainer from '../MainContainer/MainContainer';
const Main = () => {
    const [imageSrc, setImageSrc] = React.useState('/image/day_clouds.png');

  return (
    <div>
        <div className="bg-container">
         <img className="bg-img" src={imageSrc} alt="Background" />
         <div className="bg-card-container">
            <MainContainer/>
        </div>
        </div>
        
    </div>
    
  )
}

export default Main
