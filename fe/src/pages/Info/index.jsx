//Group members
//Hung Man Kei   (1155127099)	 Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)  Tsai Kwun Ki      (1155126289)

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Map from "../../component/Map";
import { _getPinfosList, _getPlaceInfo, _updateText,_updatePlace, _getJson } from "../../util/req";
import { API_KEY } from "./../Home";
import dayjs from "dayjs";
//import './style.css'

export default function Index() {
  const { place_id } = useParams();

  const [info, setInfo] = useState({
    wait: {},
    opening_hours: {
      open_now: false,
      weekday_text: [],
    },
    reviews: [],
  });
  const [placeJson, setPlaceJson] = useState([]);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const [poss, setPoss] = useState("");
  const [rat, setRat] = useState(1);
  const [updateTime, setUpdateTime] = useState([]);
  useEffect(() => {
    const getInfo = async () => {
      var data = await _getPlaceInfo(place_id);
      setPlaceJson(data.data);
      console.log(data)
      setCenter({
        lat: Number(data.data[0].geometry.location.lat) || 0,
        lng: Number(data.data[0].geometry.location.lng) || 0,
      });
      setInfo({ ...data.data[0], reviews: data.data[0].review[0].reviews });
      var boo = await _getJson();
      setUpdateTime(boo.data[0].updateTime);
    };
    getInfo();
  }, [place_id]);

  const saveText = async () => {
    var oldData = [...info.reviews];
    var data = await _getPlaceInfo(place_id);
    var pushss = {
      name: JSON.parse(localStorage.getItem("user")).username,
      text: poss,
      rating: rat,
      relative_time_description: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    oldData.push(pushss);
    console.log("oldData -> :", oldData);
    var oldRating = await data.rating;
    var oldTotalRatings = await data.user_ratings_total;
    var newTotalRatings = oldTotalRatings+1;
    var newRating = await ((oldRating*oldTotalRatings)+rat)/(newTotalRatings);


    await _updateText({
      data: JSON.stringify({
        place_id: info.place_id,
        reviews: oldData,
      }),
    });
    alert("ok");
    window.location.reload();
  };
  return (
<>
    <div className="page-container">
      
        <h4>Hospital Name: {info.wait.hospName}</h4>
     
      <p>Average Rating: {info.rating}</p>
      <p>
        Website: <a href={info.website}>{info.website}</a>
      </p>
      <p>Current Waiting Time: {info.wait.topWait}</p>
      <p>Last Update Time: {updateTime}</p>
      <p>Opening Hours: {info.opening_hours && info.opening_hours.open_now}</p>
      <p> {info.opening_hours && info.opening_hours.weekday_text} </p>
      
      <Map
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        initMapkers={placeJson}
        center={center}
      />
      <p>
        <u>Comments:</u>
      </p>
      <ul style={{ listStyleType: "none" }}>
        {info.reviews.map((it, index) => (
          <li
            key={index}
            style={{
              margin: "20px 0",
              backgroundColor: "#D1F2EB",
              padding: "10px",
            }}
          >
            <div>
              {it.author_name}{it.name}
              {it.profile_photo_url && (
                <img
                  src={it.profile_photo_url}
                  width="35px"
                  height="35px"
                  alt=""
                />
              )}              
            </div>
            <hr />
            <div>{it.text}</div>
            <br />
            <div>{it.rating} stars</div>
            <div>{it.relative_time_description}</div>
          </li>
        ))}
      </ul>
      <hr />
      <br />
      <br />
      <div>
        Leave your comment here:
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          style={{ width: "100%" }}
          value={poss}
          onChange={(e) => setPoss(e.target.value)}
        ></textarea>
        
        Rating: <select id = "dropdown" onChange={(e) => setRat(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select><br /><br />
        <button
          onClick={saveText}
          style={{
            backgroundColor: "#4CAF50",
            border: "none",
            color: "white",
            padding: "7px 32px",
          }}
        >
          Submit
        </button>
      </div>
      <br />
      <br />
    </div>
 </> );
}
