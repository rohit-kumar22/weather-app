import "./App.css";
import React, { useState, useEffect } from "react";
import clouds from "../src/weather_images/clouds.jpg";
import raining from "../src/weather_images/raining.jpg";
import thunderStrom from "../src/weather_images/thunderstorm.jpg";
import winds from "../src/weather_images/winds.jpg";
import sunny from "../src/weather_images/sunny.jpg";
import snow from "../src/weather_images/snow.jpg";
import brizzled from "../src/weather_images/bilzzard.jpg";
import mist from "../src/weather_images/mist.jpg";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("Delhi");
  const [myStyle, setMyStyle] = useState();
  const apiKey = "c55e5de688dd5d78204f51ad73170e6e";

  const images = {
    blizzard: { name: "Drizzle", path: brizzled },
    snow: {
      name: "Snow",
      path: snow,
    },
    sunny: { name: "Clear", path: sunny },
    rain: {
      name: "Rain",
      path: raining,
    },
    clouds: {
      name: "Clouds",
      path: clouds,
    },

    thunder: {
      name: "Thunderstrom",
      path: thunderStrom,
    },

    mist: {
      name: "Mist, Smoke, Haze, Dust, Fog, Sand, Ash, Squall, Tornado",
      path: mist,
    },
  };

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    fetch(url)
      .then((resp) => resp.status === 200 && resp.json())
      .then((data) => setData(data));
    console.log(data);
  }, [location]);

  useEffect(() => {
    if (data) {
      const path = Object.values(images).find((img) =>
        img.name.split(",").includes(data?.weather?.[0]?.main)
      )?.path
        ? Object.values(images).find((img) =>
            img.name.split(",").includes(data?.weather?.[0]?.main)
          )?.path
        : winds;

      if (path) {
        const style = {
          height: "100vh",
          width: "100%",
          backgroundImage: `url(${path})`,
          fontSize: "50px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        };
        setMyStyle(style);
      }
    }
  }, [data]);

  const bImage = {};
  return (
    <div className="app">
      {console.log("data", myStyle)}

      <div className="container-fluid fade-in-animation" style={myStyle}>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-7">
                <div className="row" style={{ height: "60vh" }}>
                  <div
                    className="col-sm-12  d-flex"
                    style={{ height: "50vh" }}></div>
                  <div className="col-sm-12 d-flex">
                    <h1
                      className="temprature ml-sm-5"
                      style={{ margin: "2.5rem 0 0 5rem" }}>
                      {Math.round(data?.main?.temp)}°C
                    </h1>

                    <p
                      style={{
                        margin: "5rem 0 0 4rem",
                        color: "white",
                        fontSize: "2rem",
                      }}>
                      {data?.weather?.[0]?.main}{" "}
                      <img
                        src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`}></img>
                    </p>
                    <br></br>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <p
                        className="location  "
                        style={{ margin: "2rem 0 0 5rem" }}>
                        {data?.name}
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-12" style={{ textAlign: "center" }}>
                    <p>{data?.location?.localtime}</p>
                  </div>
                  <div className="col-sm-4 "> </div>
                </div>
              </div>
              <div className="col-5">
                <div className="right-detail-info">
                  <div className="search">
                    <input
                      onKeyPress={(event) => {
                        if (event.key === "Enter" && event.target.value) {
                          setLocation(event.target.value);
                        }
                      }}
                      placeholder="Enter Location"
                      type="text"></input>
                  </div>
                  <div className="table-div">
                    <table>
                      <tr>
                        <td>Country code</td>
                        <td className="td_space">{data?.sys?.country}</td>
                      </tr>
                      <tr>
                        <td>Feels Like</td>
                        <td className="td_space">
                          {Math.round(data?.main?.feels_like)}°C
                        </td>
                      </tr>
                      <tr>
                        <td>Pressure</td>
                        <td className="td_space">{data?.main?.pressure} mb</td>
                      </tr>
                      <tr>
                        <td>Humidity</td>
                        <td className="td_space">{data?.main?.humidity}%</td>
                      </tr>
                      <tr>
                        <td>Wind</td>
                        <td className="td_space">
                          {Math.round(data?.wind?.speed)} km/h
                        </td>
                      </tr>
                      <tr>
                        <td>Visibility</td>
                        <td className="td_space">
                          {data?.visibility / 1000} km
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="row "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
