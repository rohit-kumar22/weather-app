import "./App.css";
import React, { useState, useEffect } from "react";
import clouds from "../src/weather_images/clouds.jpg";
import raining from "../src/weather_images/raining.jpg";
import thunderStrom from "../src/weather_images/thunderstorm.jpg";
import winds from "../src/weather_images/winds.jpg";
import sunny from "../src/weather_images/sunny.jpg";
import snow from "../src/weather_images/snow.jpg";
import brizzled from "../src/weather_images/bilzzard.jpg";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("Delhi");
  const [myStyle, setMyStyle] = useState();
  const apiKey = "674a720fc2716dfefe2675a2e6d0d8dd";

  const images = {
    blizzard: { name: "Blizzard", path: brizzled },
    snow: {
      name: "Blowing snow, Freezing drizzle, Patchy snow possible, Mist, Freezing fog ",
      path: snow,
    },
    sunny: { name: "Sunny", path: sunny },
    rain: {
      name: "Heavy rain,Heavy rain at times, Light rain, Moderate rain,Patchy freezing drizzle possible, Patchy light drizzle, Patchy light rain, Patchy rain Possible, Patchy sleet possible ",
      path: raining,
    },
    clouds: {
      name: "cloudy,Partly cloudy, Overcast",
      path: clouds,
    },

    thunder: {
      name: "Light drizzle, Light freezing rain, Thundery outbreaks possible",
      path: thunderStrom,
    },
  };

  useEffect(() => {
    console.log(location);
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;
    fetch(url)
      .then((resp) => resp.status === 200 && resp.json())
      .then((data) => setData(data));
    console.log(data);
  }, [location]);

  useEffect(() => {
    if (data) {
      const path = Object.values(images).find((img) =>
        img.name.split(",").includes(data?.current?.weather_descriptions[0])
      )?.path
        ? Object.values(images).find((img) =>
            img.name.split(",").includes(data?.current?.weather_descriptions[0])
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
                    style={{ height: "60vh" }}></div>
                  <div className="col-sm-12 d-flex">
                    <h1
                      className="temprature ml-sm-5"
                      style={{ margin: "0 0 0 5rem" }}>
                      {data?.current?.temperature}°C
                    </h1>
                    <p
                      className="location  "
                      style={{ margin: "1.5rem 0 0 2rem" }}>
                      {data?.location?.name}
                    </p>
                    <p style={{ margin: "3rem 0 0 2rem", color: "white" }}>
                      {data?.current?.weather_descriptions}
                    </p>
                    <br></br>
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
                        if (event.key === "Enter") {
                          setLocation(event.target.value);
                        }
                      }}
                      placeholder="Enter Location"
                      type="text"></input>
                  </div>
                  <div className="table-div">
                    <table>
                      <tr>
                        <td>Feels Like</td>
                        <td>{data?.current?.feelslike}°C</td>
                      </tr>
                      <tr>
                        <td>Pressure</td>
                        <td>{data?.current?.pressure}MB</td>
                      </tr>
                      <tr>
                        <td>Humidity</td>
                        <td>{data?.current?.humidity}%</td>
                      </tr>
                      <tr>
                        <td>Wind</td>
                        <td>{data?.current?.wind_speed}km/h</td>
                      </tr>
                      <tr>
                        <td>Precipitation</td>
                        <td>{data?.current?.precip}mm</td>
                      </tr>
                      <tr>
                        <td>UV Index</td>
                        <td>{data?.current?.uv_index}</td>
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
