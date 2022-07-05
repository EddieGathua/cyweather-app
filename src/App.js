import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [timeIndex, setTimeIndex] = useState([]);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,cloudcover_mid,windspeed_120m`;

  const getWeather = () => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
    setLatitude("");
    setLongitude("");
  };

  useEffect(() => {
    const currentDate = new Date().getDate();
    const currentTimeIndex = [];

    data.hourly?.time.filter((time, index) => {
      const date = new Date(time).getDate();
      if (date === currentDate) {
        currentTimeIndex.push(index);
      }
    });

    setTimeIndex(currentTimeIndex.slice(6, 19));
  }, [data]);

  return (
    <div className="app">
      <div className="input-container">
        <div className="enter">
          <input
            value={latitude}
            onChange={(event) => setLatitude(event.target.value)}
            placeholder="Enter Latitude"
            type="number"
          />
        </div>
        <div className="enter">
          <input
            value={longitude}
            onChange={(event) => setLongitude(event.target.value)}
            placeholder="Enter Longitude"
            type="number"
          />
        </div>
        <div className="enter">
          <button onClick={getWeather}>Get Weather</button>
        </div>
      </div>
      {data.hourly &&
        timeIndex.map((timeIndex, index) => {
          return (
            <div className="container" key={index}>
              <div className="bottom">
                <div className="time">
                  <p className="bold">Time</p>
                  <p>{data.hourly.time[timeIndex].slice(12)}</p>
                </div>
                <div className="temp">
                  <p className="bold">Temperature</p>
                  <p>{data.hourly.temperature_2m[timeIndex]} °C</p>
                </div>
                <div className="wind-speed">
                  <p className="bold">Wind Speed</p>
                  <p>{data.hourly.windspeed_120m[timeIndex]} mph</p>
                </div>
                <div className="cloud-cover">
                  <p className="bold">Cloud Cover</p>
                  <p>{data.hourly.cloudcover_mid[timeIndex]} %</p>
                </div>
                <div className="humidity">
                  <p className="bold">Humidity</p>
                  <p>{data.hourly.relativehumidity_2m[timeIndex]} %</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
