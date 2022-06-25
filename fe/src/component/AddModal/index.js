//Group members
//Hung Man Kei   (1155127099)	   Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)      Tsai Kwun Ki      (1155126289)

import React, { useEffect, useState } from "react";
import { _getUserList, _delUser, _reg, _update } from "../../util/req";
import Button from '../button'
import ModalWithTitle from '../ModalWithTitle'
import "./style.css"
import clsx from "clsx"

export default function AddModal(props)  {
	const gelist = async () => {
    var res = await _getUserList();
    setList(res.data);
	};
	const [list, setList] = useState([]);
	const [info, setInfo] = useState({
    username: "",
    password: "",
  });


	const handleInfo = (infoForm) =>{
		setInfo({...infoForm})
	}
	const save = async () => {
		if(!info.username || !info.password) {
			alert ("No blank!");
			return;
		}
		if(info.username.length>=4 && info.password.length>=4 && info.username.length<=20 && info.password.length<=20) {
	
			if (info._id) {
				var res1 = await _update(info);
				if(res1.code===500){
					alert("Username already exist");
					return;
				}
			} else {
				var res1 = await _reg(info);
				console.log(res1.code);	
				if(res1.code===500){
					alert("Username already exist");
					return;
				}
			}
			gelist();
			alert("Updated/Added!");
			props.onClickClose();
			setInfo({ username: "", password: "" });
	 }else {
		 alert("Username and password should between 4 and 20 characters");
	}};

	const update = async (it) => {
    setInfo({ ...it });
  };

	useEffect(() => {
		handleInfo(infoForm);
    gelist();
  }, []);

	const { up = false, infoForm ,className} = props;

  return(
    <ModalWithTitle englishTitle={up ? "Update User": "Add New User"} onClick={props.onClickClose} backgroundColor="#1F6332">
		<div className="addmodal-container">
			<div className="addmodal-title-container">
				<span className="addmodal-english-title">
					User Name:{" "}
				</span>
			</div>
			<div className="addmodal-input-container">
				<input className="addmodal-input"
					type="text" 
					value={info.username}
					onChange={(e) => {
						setInfo({ ...info, username: e.target.value }); 
					}}
				/>
			</div>
			<div className="addmodal-title-container">
				<span className="addmodal-english-title">
					Password:{" "}
				</span>
			</div>
      <div className="addmodal-input-container">
				<input className="addmodal-input" 
						type="text" 
            value={info.password}
            onChange={(e) => {
              setInfo({ ...info, password: e.target.value });
					}}
				/>
			</div>
			<div className="addmodal-button-container">
				<div className="addmodal-button">
					<Button chineseLabel="確認" englishLabel="Confirm" onClick={save} >
						{info._id ? "Save" : "Create"}
					</Button>
				</div>
      </div>
		</div>	
  	</ModalWithTitle>
  )

}
