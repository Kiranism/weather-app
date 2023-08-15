import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingCard from "./LoadingCard";
import { toast } from "react-hot-toast";

const DetailCard = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const navigate = useNavigate();
  useEffect(() => {
    getWeather();
  }, []);
  const getWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_APP_WEATHER_KEY
        }&units=metric`
      );
      const response = await res.json();
      setData(response);
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <LoadingCard />;
  }
  return (
    <div className="card-container">
      <div className="card-header">
        <img
          src="/left.png"
          width="20px"
          height="20px"
          className="left-arrow"
          onClick={() => navigate("/")}
        />
        <h2 className="title-detail">Weather App</h2>
      </div>
      {data?.message && (
        <div className="card-section-detail">
          <p className="message">{data.message}</p>
        </div>
      )}

      <div className="card-section-detail">
        {data?.weather && data?.weather[0].icon && (
          <img
            src={`/icons/${data?.weather[0]?.icon}.png`}
            height="100px"
            width="100px"
          />
        )}
        <h1 className="temp-value">{Math.round(data.main?.temp)}°C</h1>
        <h4 className="temp-desc">
          {data?.weather && data?.weather[0]?.description}
        </h4>
        <div className="location">
          <img src="/location.png" width="15px" height="15px" />
          <h5 className="temp-loc">{data?.name}</h5>
        </div>
      </div>
      <div className="card-footer">
        <div className="card-mini with-border-right ">
          <img src="/temp.png" width="35px" height="35px" />
          <div>
            <p className="text-value">{Math.round(data?.main?.feels_like)}°C</p>
            <p className="text-desc">Feels like</p>
          </div>
        </div>
        <div className="card-mini">
          <img src="/drop.png" width="35px" height="35px" />
          <div>
            <p className="text-value">{data?.main?.humidity}%</p>
            <p className="text-desc">Humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
