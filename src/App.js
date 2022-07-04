import "./App.css";
import React, { useState, useEffect } from "react";
import weatherImg from "../src/weather_images/clouds.jpg";
function App() {
  const responseHardCoded = {
    request: {
      type: "City",
      query: "New York, United States of America",
      language: "en",
      unit: "m",
    },
    location: {
      name: "New York",
      country: "United States of America",
      region: "New York",
      lat: "40.714",
      lon: "-74.006",
      timezone_id: "America/New_York",
      localtime: "2022-07-04 11:01",
      localtime_epoch: 1656932460,
      utc_offset: "-4.0",
    },
    current: {
      observation_time: "03:01 PM",
      temperature: 25,
      weather_code: 116,
      weather_icons: [
        "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png",
      ],
      weather_descriptions: ["Partly cloudy"],
      wind_speed: 9,
      wind_degree: 30,
      wind_dir: "NNE",
      pressure: 1021,
      precip: 0,
      humidity: 37,
      cloudcover: 25,
      feelslike: 25,
      uv_index: 7,
      visibility: 16,
      is_day: "yes",
    },
  };
  const [data, setData] = useState(responseHardCoded);
  const [location, setLocation] = useState("Delhi");
  const apiKey = "674a720fc2716dfefe2675a2e6d0d8dd";

  const images = {
    // hot:'.'
  };

  // useEffect(() => {
  //   console.log(location);
  //   const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;
  //   fetch(url)
  //     .then((resp) => resp.status === 200 && resp.json())
  //     .then((data) => setData(data));
  //   console.log(data);
  // }, [location]);

  const myStyle = {
    backgroundImage: `url(${weatherImg})`,
    height: "100vh",
    width: "100%",

    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="app">
      {console.log("data", data)}

      <div className="container-fluid" style={myStyle}>
        <div className="row">
          <div className="col-12"></div>
          <div className="col-12">
            <div className="row">
              <div className="col-7">
                <div className="row " style={{ height: "60vh" }}>
                  <div
                    className="col-sm-12  d-flex"
                    style={{ height: "60vh" }}></div>
                  <div
                    className="col-sm-8 d-flex"
                    style={{ margin: "0 0 0 5rem" }}>
                    <h1 className="temprature ml-sm-5">
                      {data?.current?.temperature}°C
                    </h1>
                    <p
                      className="location  "
                      style={{ margin: "3rem 0 0 2rem" }}>
                      {data?.location?.name}
                    </p>
                    <br />
                    <div style={{ marginTop: "5rem" }}>
                      <span
                        style={{
                          fontSize: "1rem",
                          fontWeight: "normal",
                          color: "#fff",
                        }}>
                        {data?.location?.timezone_id}
                      </span>
                      <br />
                      <span
                        style={{
                          fontSize: "1rem",
                          fontWeight: "normal",
                          color: "#fff",

                          // marginLeft: "20rem",
                        }}>
                        {data?.location?.localtime}
                      </span>
                    </div>
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
                        <td>Pressure</td>
                        <td>{data?.current?.pressure}</td>
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
                        <td>Precipation</td>
                        <td>{data?.current?.precip}</td>
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
