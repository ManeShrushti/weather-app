import {FilterDramaOutlined, FlareOutlined, ThermostatOutlined, WaterDropOutlined} from '@mui/icons-material';

export const CurrentDetailsInfo = [
    {
        title: 'Feels Like',
        key: 'feelsLikeTemp',
        icon: 'feels_like',
        subtitle: 'Perceived temperature considering wind and humidity',
        unit: '°C',
        value: null
    },
    {
        title: 'Precipitation',
        key: 'precipRate',
        icon: 'precipitation',
        subtitle: 'Amount of rain / snowfall',
        unit: 'mm',
        value: null
    },
    {
        title: 'Cloudiness',
        key: 'cloudiness',
        icon: 'cloudiness',
        subtitle: 'Percentage of sky covered by clouds right now',
        unit: '%',
        value: null
    },
    {
        title: 'Humidity',
        key: 'relHumidity',
        icon: 'humidity',
        subtitle: 'Percentage of sky covered by clouds right now',
        value: null
    }

]

export const IconsMap = {
    'feels_like' : ThermostatOutlined,
    'precipitation': WaterDropOutlined,
    'cloudiness': FilterDramaOutlined,
    'humidity': FlareOutlined
}
export const SymbolsPhrases = {
"000": "Clear",
"100": "Mostly clear",
"200": "Partly cloudy",
"210": "Partly cloudy and light rain",
"220": "Partly cloudy and showers",
"240": "Partly cloudy, thunderstorms with rain",
"211": "Partly cloudy and light wet snow",
"212": "Partly cloudy and light snow",
"221": "Partly cloudy and wet snow showers",
"222": "Partly cloudy and snow showers",
"300": "Cloudy",
"320": "Cloudy and showers",
"310": "Cloudy and light rain",
"340": "Cloudy, thunderstorms with rain",
"311": "Cloudy and light wet snow",
"312": "Cloudy and light snow",
"321": "Cloudy and wet snow showers",
"322": "Cloudy and snow showers",
"400": "Overcast",
"410": "Overcast and little rain",
"420": "Overcast and showers",
"430": "Overcast and rain",
"440": "Overcast, thunderstorms with rain",
"411": "Overcast and light wet snow",
"412": "Overcast and light snow",
"421": "Overcast and wet snow showers",
"422": "Overcast and snow showers",
"431": "Overcast and wet snow",
"432": "Overcast and snow",
"500": "Thin upper cloud",
"600": "Fog",
"xxx": "Others"
}
