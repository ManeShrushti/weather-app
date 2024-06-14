export interface LocationData {
    locations: Location[];
}

export interface Location {
    id:        number;
    name:      string;
    country:   string;
    timezone:  string;
    adminArea: string;
    lon:       number;
    lat:       number;
}

export interface CurrentWeather {
    current: Weather;
}

export interface Weather {
    time:          string;
    symbol:        string;
    symbolPhrase:  string;
    temperature:   number;
    feelsLikeTemp: number;
    relHumidity:   number;
    dewPoint:      number;
    windSpeed:     number;
    windDir:       number;
    windDirString: string;
    windGust:      number;
    precipProb:    number;
    precipRate:    number;
    cloudiness:    number;
    thunderProb:   number;
    uvIndex:       number;
    pressure:      number;
    visibility:    number;
}


export interface HourlyForecastInfo {
    forecast: HForecast[];
}

export interface HForecast {
    time:           string;
    symbol:         string;
    symbolPhrase:   string;
    temperature:    number;
    feelsLikeTemp:  number;
    windSpeed:      number;
    windGust:       number;
    relHumidity:    number;
    dewPoint:       number;
    windDir:        number;
    windDirString:  WindDirString;
    precipProb:     number;
    precipAccum:    number;
    snowAccum:      number;
    cloudiness:     number;
    thunderProb:    number;
    uvIndex:        number;
    pressure:       number;
    visibility:     number;
    solarRadiation: number;
    snowDepth:      number;
    precipType:     PrecipType;
}

export enum PrecipType {
    Rain = "rain",
}

export enum WindDirString {
    S = "S",
    Sw = "SW",
    W = "W",
}

export interface DailyForecastInfo {
    forecast: DForecast[];
}

export interface DForecast {
    date:              Date;
    symbol:            string;
    symbolPhrase:      string;
    maxTemp:           number;
    minTemp:           number;
    maxFeelsLikeTemp:  number;
    minFeelsLikeTemp:  number;
    maxRelHumidity:    number;
    minRelHumidity:    number;
    maxDewPoint:       number;
    minDewPoint:       number;
    precipAccum:       number;
    snowAccum:         number;
    maxWindSpeed:      number;
    windDir:           number;
    maxWindGust:       number;
    precipProb:        number;
    cloudiness:        number;
    sunrise:           string;
    sunset:            string;
    sunriseEpoch:      number;
    sunsetEpoch:       number;
    moonrise:          string;
    moonset:           string;
    moonPhase:         number;
    uvIndex:           number;
    minVisibility:     number;
    pressure:          number;
    confidence:        string;
    solarRadiationSum: number;
    snowDepth:         number;
}


