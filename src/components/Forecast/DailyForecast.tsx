import { Subscription } from 'rxjs';
import WeatherService from '../../services/weatherService';
import { useState, useEffect } from 'react';
import { Location, DForecast, DailyForecastInfo } from '../../models/weather';
import { Typography } from '@mui/material';
import moment from 'moment';
import { AccessTimeOutlined, CalendarTodayOutlined } from '@mui/icons-material';

interface DailyInfoProps {
  locationData: Location | null;
  setMetaInfo: (metaData: DForecast) => void;
  tempUnit: string | 'C';
}

const DailyForecast = (props: DailyInfoProps) => {
  let weatherService = new WeatherService();
  const [dailyForecast, setDailyForecast] = useState<DForecast[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  let currentSub: Subscription;

  const getIconURL = (symbol: string) => {
    return `/image/symbols/${symbol}.png`;
  };

  useEffect(() => {
    if (currentSub) {
      currentSub.unsubscribe();
    }
    if (props.locationData?.id) {
      currentSub = weatherService.getForecast(props.locationData.id, 'daily', 7, props.tempUnit).subscribe({
        next: (data: DailyForecastInfo) => {
          setDailyForecast(data.forecast);
          props.setMetaInfo(data.forecast[0]);
        },
        error: (err) => {
          setError(err.message);
        },
      });
    }
  }, [props.locationData?.id, props.tempUnit]);

  return (
    dailyForecast && (
      <div className="flex flex-col justify-start w-full p-4">
        <div className="flex items-center text-left mb-2">
          <CalendarTodayOutlined sx={{ fontSize: '1em', marginBottom: '0.25em' }} />
          <span className="ml-2">Daily Forecast</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {dailyForecast.map((fc, index) => (
            <div
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-sm"
              key={index.toString()}
            >
              <div className="text-sm font-medium">{index === 0 ? 'Today' : moment.parseZone(fc.date).format('ddd')}</div>
              <div className="text-xs mt-2">
                <div>Min: {fc.minTemp}{'\u00b0'}{props.tempUnit}</div>
                <div>Max: {fc.maxTemp}{'\u00b0'}{props.tempUnit}</div>
              </div>
              <img src={getIconURL(fc.symbol)} alt={fc.symbol} className="w-12 h-12 mt-2" />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default DailyForecast;
