//Group members
//Hung Man Kei   (1155127099)	 Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)  Tsai Kwun Ki      (1155126289)

import React, { useEffect, useState } from "react";
import { _getUserList, _delUser, _reg, _update } from "../../util/req";
import AddModal from '../../component/AddModal';
import Button from '../../component/button';
import './style.css';

export default function Index() {
  
  const TableFilter = (function(Arr) {

		var _input;

		function _onInputEvent(e) {
			_input = e.target;
			var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
			Arr.forEach.call(tables, function(table) {
				Arr.forEach.call(table.tBodies, function(tbody) {
					Arr.forEach.call(tbody.rows, _filter);
				});
			});
		}

		function _filter(row) {
			var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
			row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
		}

		return {
			init: function() {
				var inputs = document.getElementsByClassName('table-filter');
				Arr.forEach.call(inputs, function(input) {
					input.oninput = _onInputEvent;
				});
			}
		};
	})(Array.prototype);


  const [showAddModal,setAddModal] = useState(false);
  const [showUpdateModal,setUpdateModal] = useState(false);
  const handleClickAdd = () => {
    setAddModal(true)
  }
  const handleCloseModal = () => {
    setAddModal(false)
    setUpdateModal(false);
    gelist();
  }
  const [list, setList] = useState([]);
  const [infoForm, setInfoForm] = useState({
    username: "",
    password: "",
  });

  const gelist = async () => {
    var res = await _getUserList();
    setList(res.data);
  };
  const del = async (id) => {
    await _delUser(id);
    gelist();
    alert("User Deleted!");
  };
  
  const update = async (it) => {
    setInfoForm({ ...it });
    setUpdateModal(true);
  };

  useEffect(() => {
    TableFilter.init();
    gelist();
  }, []);

  return (
    <div className="page-container">
      <br />
      <br />
      <div className="button-container">
      <div className="user-button">
        <Button  onClick={handleClickAdd} englishLabel="Create User"/>
      </div>
      </div>

      <input type="search" class="table-filter" data-table="table" placeholder="search data in any field"/>


      <table  className="table">
        <thead>
          <tr>
            <td>Username</td>
            <td>Password</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {list.map((it, index) => (
            <tr key={index}>
              <td>{it.username}</td>
              <td>{it.password}</td>
              <td>
                <div className="table-action-container">
                  <div className="user-button">
                    <Button className="up-del-button" englishLabel="Update" onClick={() => update(it)}/>
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
      {showAddModal&&<AddModal className="admin-modal" onClickClose={handleCloseModal}></AddModal>}
      {showUpdateModal&&<AddModal up infoForm={infoForm} className="admin-modal" onClickClose={handleCloseModal}></AddModal>}
    </div>
  );
}
