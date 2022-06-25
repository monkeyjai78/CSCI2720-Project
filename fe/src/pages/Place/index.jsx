//Group members
//Hung Man Kei   (1155127099)	 Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)  Tsai Kwun Ki      (1155126289)

import React, { useEffect, useState } from "react";
import PlaceModal from '../../component/PlaceModal';
import Button from '../../component/button';
import './style.css';

import {
  _saveJson,
  _saveReviewsJson,
  _getPlacesLists,
  _delPlace,
  _updatePlace,
  _getJson
} from "../../util/req";

export default function Index() {
  const [list, setList] = useState([]);
  const [infoForm, setInfoForm] = useState({
    name: "",
    rating: "",
    formatted_phone_number: "",
    website: "",
    formatted_address: "",
    geometry: { location:{ lat:"",lng:""}},
  });

  const [showPlaceModal,setPlaceModal] = useState(false);
  const [showUpdateModal,setUpdateModal] = useState(false);
  
  const [updateTime, setUpdateTime] = useState([]);
  const handleClickPlace = () => {
    setPlaceModal(true)
  }
  const handleCloseModal = () => {
    setPlaceModal(false)
    setUpdateModal(false);
    gelist();
  }

  const gelist = async () => {
    var res = await _getPlacesLists();
    setList(res.data);
  };
  const del = async (id) => {
    await _delPlace(id);
    alert("ok");
    gelist();
  };
  const save = async () => {
    await _updatePlace(infoForm);
    alert("ok");
    gelist();
    setInfoForm({
      name: "",
      rating: "",
      formatted_phone_number: "",
      website: "",
      formatted_address: "",
      geometry: { location:{ lat:"",lng:""}},
    });
  };
  const update = async (it) => {
    setInfoForm({ ...it });
    setUpdateModal(true);
  };
  const created = async () => {
    await _saveJson();
    await _saveReviewsJson();
    alert("ok");
  };

  useEffect(() => {
    const getInfo = async () => {
      var boo = await _getJson();
      setUpdateTime(boo.data[0].updateTime);
    };
    getInfo();
    gelist();
  }, []);

  return (
    <div className="page-container">
      <br />
      <br />
      <div className="place-button-container">
        <div className="place-button">
          <Button englishLabel="Refesh data"  onClick={created}/>
        </div>
        <div className="place-button">
          <Button englishLabel="New Place"  onClick={handleClickPlace}/>
        </div>
      </div>
    
      <div>API Last Update Time: {updateTime}</div>
      <br />
  <table className="table">
    <thead>
      <tr>
        <td>name</td>
        <td>rating</td>
        <td>user_ratings_total</td>
        <td>formatted_phone_number</td>
        <td>website</td>
        <td>formatted_address</td>
        <td>action</td>
      </tr>
    </thead>
    <tbody>
      {
        list.map((it, index) => (
            <tr key={index}>
              <td>{it.name}</td>
              <td>{it.rating}</td>
              <td>{it.user_ratings_total}</td>
              <td>{it.formatted_phone_number}</td>
              <td>{it.website}</td>
              <td>{it.formatted_address}</td>
              <td>
                <div className="table-action-container">
                  <div className="user-button">
                  <Button englishLabel="Update" onClick={() => update(it)}/>
                  </div>
                  <div className="user-button">
                  <Button englishLabel="Delete" onClick={() => del(it._id)}/>
                  </div>
                </div>
              </td>
            </tr>
          ))}
    </tbody>
    </table>
      {showPlaceModal&&<PlaceModal className="admin-modal" onClickClose={handleCloseModal}></PlaceModal>}
      {showUpdateModal&&<PlaceModal up infoForm={infoForm} className="admin-modal" onClickClose={handleCloseModal}></PlaceModal>}
  </div>
  );
}

