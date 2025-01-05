"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Sun, Moon, Cloud, CloudSun, CloudMoon, Loader2 } from "lucide-react";

const DigitalWatch = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherDescription, setWeatherDescription] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
  const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const fetchWeather = async (lat: number, lon: number) => {
      try {
        if (!PUBLIC_API_KEY || !PUBLIC_API_URL) {
          throw new Error("API Key or URL is missing.");
        }

        const response = await fetch(
          `${PUBLIC_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${PUBLIC_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setTemperature(Math.round(data.main.temp)); // Round temperature to nearest integer
        setWeatherDescription(
          data.weather[0]?.main?.toLowerCase() || "unknown"
        );
        setError(null);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (error) => {
            setError("Location access denied. Unable to fetch weather data.");
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
      }
    };

    getLocation();
    const weatherInterval = setInterval(getLocation, 600000); // Update every 10 minutes

    return () => {
      clearInterval(timer);
      clearInterval(weatherInterval);
    };
  }, [PUBLIC_API_KEY, PUBLIC_API_URL]);

  const getWeatherIcon = () => {
    const hour = currentTime.getHours();
    const isNight = hour < 6 || hour >= 18;

    if (!weatherDescription) {
      return <Loader2 className="w-4 h-4 animate-spin" />;
    }

    if (weatherDescription.includes("clear")) {
      return isNight ? (
        <Moon className="w-6 h-6" />
      ) : (
        <Sun className="w-6 h-6" />
      );
    } else if (weatherDescription.includes("cloud")) {
      return isNight ? (
        <CloudMoon className="w-6 h-6" />
      ) : (
        <CloudSun className="w-6 h-6" />
      );
    } else {
      return <Cloud className="w-6 h-6" />;
    }
  };

  const getTextColor = () => {
    if (temperature !== null) {
      return temperature > 20 ? "text-gray-900" : "text-yellow-600";
    }
    return "text-gray-900";
  };

  return (
    <div
      className={`flex flex-row items-center justify-center rounded-md py-1 border px-2 gap-2 w-[150px] ${getTextColor()} transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col items-center">
        <div className="text-sm font-semibold flex items-center">
          <span>{format(currentTime, "h:mm:ss")}</span>
          <span className="text-xs ml-1">{format(currentTime, "a")}</span>
        </div>
        <div className="text-[10px]">{format(currentTime, "MMM d, yyyy")}</div>
      </div>
      <div className="flex items-center gap-1">
        {getWeatherIcon()}
        <span className="text-xs font-medium">
          {error ? error : temperature !== null ? `${temperature}°C` : "..."}
        </span>
      </div>
    </div>
  );
};

export default DigitalWatch;
