import cloudy from "../assets/images/cloudy.svg";
import sunny from "../assets/images/sunny.svg";
import storm from "../assets/images/storm.svg";
import rainy from "../assets/images/Rain cloud.svg";

export const getWeatherIcon = (weatherMain?: string): string => {
    switch (weatherMain) {
        case "Clear":
            return sunny;
        case "Rain":
        case "Drizzle":
        case "Snow":
            return rainy;
        case "Thunderstorm":
            return storm;
        case "Clouds":
        default:
            return cloudy;
    }
};