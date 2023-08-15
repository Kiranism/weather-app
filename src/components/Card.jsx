import { useState } from "react";
import { CITY_URL, geoOptions } from "../service";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const getData = async (value) => {
    try {
      const res = await fetch(`${CITY_URL}?namePrefix=${value}`, geoOptions);
      const response = await res.json();
      return response;
    } catch (error) {
      console.log("error", error);
    }
  };
  const debounceFn = (cb, delay) => {
    let timer;
    return function (args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb(args);
      }, delay);
    };
  };

  const handleInput = async (e) => {
    const value = e.target.value;
    let filArr = await getData(value);
    setFilteredData(filArr.data);
  };

  const handleMenuClick = (item) => {
    navigate(`/weather?lat=${item.latitude}&lon=${item.longitude}`);
  };
  const optimizedHandleInput = debounceFn(handleInput, 2000);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      navigate(`/weather?lat=${latitude}&lon=${longitude}`);
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <h2 className="title">Weather App</h2>
      </div>
      <div className="card-section">
        <div className="input-container">
          <input
            type="text"
            onChange={optimizedHandleInput}
            name="search"
            autoComplete="off"
            className="input-field"
            placeholder="Enter city name"
          />
          {!!filteredData?.length && (
            <div className="suggestion">
              {filteredData?.map((item) => (
                <div key={item.id} className="suggestion-items">
                  <span onClick={() => handleMenuClick(item)}>{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="separator"></div>
        <button onClick={() => handleLocationClick()}>
          Get Device Locations
        </button>
      </div>
    </div>
  );
};

export default Card;
