//Group members
//Hung Man Kei   (1155127099)	 Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)  Tsai Kwun Ki      (1155126289)

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { _getFavsList } from "./../../util/req";
export default function Index() {
  const [List, setList] = useState([]);
  const [sort, setSort] = useState(false);

  const getList = async () => {
    var data = await _getFavsList(JSON.parse(localStorage.getItem("user"))._id);
    var mpdata = data.data.map((it, index) => ({
      ...it,
      ...it.place[0],
    }));
    mpdata.sort(
      (a, b) => a.wait.hospName.charCodeAt(0) - b.wait.hospName.charCodeAt(0)
    );
    setList(mpdata);
    console.log("data -> :", mpdata);
  };
  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {
    const nwList = List;
    if (sort) {
      nwList.sort(
        (a, b) => a.wait.hospName.charCodeAt(0) - b.wait.hospName.charCodeAt(0)
      );
    } else {
      nwList.sort(
        (a, b) => b.wait.hospName.charCodeAt(0) - a.wait.hospName.charCodeAt(0)
      );
    }
    console.log("nwList -> :", nwList);

    setList(nwList);
  }, [List, sort]);

  return (
    <div className="page-container">
      <br />
      <br />
      <br />
      <table className="table">
        <thead >
          <tr>
            <td>
              HOSPNAME{" "}
              {sort ? (
                <span
                  onClick={() => {
                    setSort(false);
                  }}
                >
                  ↑
                </span>
              ) : (
                <span
                  onClick={() => {
                    setSort(true);
                  }}
                >
                  ↓
                </span>
              )}
            </td>
            <td>NAME</td>
            <td>FORMATTED_ADDRESS</td>
            <td>WEBSITE</td>
            <td>TOPWAIT</td>
            <td>RATING</td>
            <td>ICON</td>
          </tr>
        </thead>
        <tbody>
          {List.map((it, index) => (
            <tr key={index}>
              <td>
                <Link to={`/index/info/${it.place_id}`}>
                  {it.wait && it.wait.hospName}
                </Link>
              </td>
              <td>{it.name}</td>
              <td>{it.formatted_address}</td>
              <td>
                <a href={it.website}>{it.website}</a>
              </td>
              <td>{it.wait && it.wait.topWait}</td>
              <td>{it.rating}</td>
              <td><img src={it.icon} width="50px" height="50px" alt="" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
