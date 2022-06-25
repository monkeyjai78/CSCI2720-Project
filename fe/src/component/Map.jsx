//Group members
//Hung Man Kei   (1155127099)	 Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)  Tsai Kwun Ki      (1155126289)

import React, { createRef, useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { Link } from "react-router-dom";

import { _addPlace } from "./../util/req";

function Map({ center, initMapkers }) {
  return (
    <div className="google-map" style={{ height: "100vh" }}>
      <GoogleMap defaultZoom={14} defaultCenter={center} center={center}>
        {initMapkers.map((it, index) => (
          <Marker
            key={it.place_id}
            position={{
              lat: Number(
                typeof it.geometry.location.lat === "function"
                  ? it.geometry.location.lat()
                  : it.geometry.location.lat
              ),
              lng: Number(
                typeof it.geometry.location.lng === "function"
                  ? it.geometry.location.lng()
                  : it.geometry.location.lng
              ),
            }}
          >
            <InfoWindow>
              <>
                <p>
                  <Link to={`/index/info/${it.place_id}`}>{it.name}</Link>
                </p>
                {it.wait && <p>Waiting Time: {it.wait.topWait}</p>}
                <p>
                  <button
                    onClick={async () => {
                      var sre = await _addPlace({
                        place_id: it.place_id,
                        user_id: JSON.parse(localStorage.getItem("user"))._id,
                      });
                      alert(sre.msg);
                    }}
                    type="button"
                    style={{
                      color: "white",
                      padding: "5px 32px",
                      backgroundColor: "#4CAF50",
                      border: "none",
                    }}
                  >
                    Add Favorites
                  </button>
                </p>
              </>
            </InfoWindow>
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
}

export default withGoogleMap(Map);
