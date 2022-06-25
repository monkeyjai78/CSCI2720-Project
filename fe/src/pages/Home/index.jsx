//Group members
//Hung Man Kei   (1155127099)	 Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)  Tsai Kwun Ki      (1155126289)

/* eslint-disable no-sequences */
import React, { useEffect, useState } from "react";
import Map from "../../component/Map";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";
import './style.css';

import {
  _getJson,
  _getPidsList,
  _getPinfosList,
  _saveJson,
  _saveReviewsJson,
  _getPlacesLists,
} from "./../../util/req.js";

// const API_KEY = "AIzaSyCvHcIZbtF80KUW23vCV_kmmr2EVixerAI";
export const API_KEY = "AIzaSyAiDq7ONa1fA5PGU5qTJPbfAeXwCCdjDbQ";

const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

export default function Index() {
  const refs = {};
  const [places, setPlaces] = useState([]);

  const [placeJson, setPlaceJson] = useState([]);
  const [center, setCenter] = useState({
    lat: 22.320048,
    lng: 114.173355,
  });
  const [UpdateTime, setUpdateTime] = useState([]);
  const getPlaceList = async (placeJson) => {
    var nameList = placeJson;

    var reqList = nameList.map(
      async (it, index) =>
        await _getPidsList(
          `/queryautocomplete/json?&key=${API_KEY}&input=${it.hospName}`
        )
    );

    var data = await Promise.all(reqList);
    var finalDataList = data
      .map((it) => it.predictions[0].place_id)
      .map(
        async (it, index) =>
          await _getPinfosList(`/details/json?&key=${API_KEY}&placeid=${it}`)
      );

    var dataList = await Promise.all(finalDataList);

    var finalData = dataList.map((it, index) => ({
      ...it.result,
      wait: nameList[index],
    }));

    var saveJson = finalData.map((it) =>
      pick(it, [
        "name",
        "formatted_address",
        "formatted_phone_number",
        "icon",
        "geometry",
        "opening_hours",
        "place_id",
        "rating",
        "user_ratings_total",
        "wait",
        "website",
      ])
    );
    var reviewsJson = finalData.map((it) => pick(it, ["reviews", "place_id"]));
    console.log("finalData -> :", finalData);

    await _saveJson({ data: JSON.stringify(saveJson) });
    await _saveReviewsJson({ data: JSON.stringify(reviewsJson) });
    setPlaceJson(finalData);
  };

  useEffect(() => {
    const getJson = async () => {
      // var res = await _getJson();
      // getPlaceList(res.data);
      var res = await _getPlacesLists();
      setPlaceJson(res.data);
      var boo = await _getJson();
      setUpdateTime(boo.data[0].updateTime);
    };
    getJson();
    
  }, []);
  return (
    <div className="home-container">
      <div className="search-container" style={{ textAlign: "center", width: "420px", margin: "0 auto" }}>
        <StandaloneSearchBox
          ref={(res) => {
            refs.searchBox = res;
          }}
          onPlacesChanged={() => {
            const places = refs.searchBox.getPlaces();
            console.log("places -> :", places);
            // setPlaces([...places]);
            console.log("la", {
              lat: Number(places[0].geometry.location.lat()),
              lng: Number(places[0].geometry.location.lng()),
            });

            setCenter({
              lat: Number(places[0].geometry.location.lat()),
              lng: Number(places[0].geometry.location.lng()),
            });
            setPlaceJson([...places]);
          }}
        >
          <input
            type="text"
            placeholder="Input Hospital Name"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `100%`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </StandaloneSearchBox>
        <ul>
          {places.map(
            ({ place_id, formatted_address, geometry: { location } }) => (
              <li key={place_id}>
                {formatted_address}
                {" at "}({location.lat()}, {location.lng()})
              </li>
            )
          )}
        </ul>
      </div>

      <div className="map-container">
      <Map
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `550px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        initMapkers={placeJson}
        center={center}
      />
      </div>
      <div>
        <p>Last Update Time: {UpdateTime}</p>
      </div>
    </div>
  );
}
