import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getProfileData, updateProfileImg } from "../../utils/userApiCalls.js";
import ProfileUpdate from "./ProfileUpdate.js";

const Profile = () => {
  const BASE_IMG_URL = "https://res.cloudinary.com/dkeewhdlg/";
  const user = useSelector((state) => state.user.value);
  const [profile, setProfile] = useState({});
  const [token, setToken] = useState({});
  const [popUpStatus, setPopUpStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [newPreviewImage, setNewPreviewImage] = useState(null);
  const handlePopUp = () => {
    popUpStatus ? setPopUpStatus(false) : setPopUpStatus(true);
  };
  const handleImgUpload = (e) => {
    const newImg = e.target.files[0];
    setNewImage(newImg);
    if (newImg) {
      let previewImg = URL.createObjectURL(newImg);
      setNewPreviewImage(previewImg);
    }
  };
  const handleSubmitImg = async (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("image", newImage);
    console.log("fd", fd);
    const resp = await updateProfileImg(token, fd);
    console.log(resp);
  };

  const getProfile = async (token) => {
    let resp = await getProfileData(token);
    const newProfile = {
      firstName: resp.firstName ? resp.firstName : "",
      lastName: resp.lastName ? resp.lastName : "",
      phone: resp.phone ? resp.phone : "",
      country: resp.country ? resp.country : "",
      town: resp.town ? resp.town : "",
      image: resp.image ? resp.image : "",
    };
    setProfile(newProfile);
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    setToken(token);
    getProfile(token);
  }, [popUpStatus]);
  return (
    <div className="userInfo">
      <div>
        <h1>Hey {user.username}!</h1>
        <h3>Your email: {user.email}</h3>
      </div>
      <img
        src={
          newPreviewImage
            ? newPreviewImage
            : profile.image
            ? `${BASE_IMG_URL}${profile.image}`
            : "/staticImgs/defaultProfile.jpg"
        }
        alt="profile"
      />
      <form className="imageForm">
        <input type="file" onChange={(e) => handleImgUpload(e)} />
        <button onClick={(e) => handleSubmitImg(e)}>Upload</button>
      </form>

      {message && <p className="message">{message}</p>}
      <h1>Personal information</h1>
      <div className="profile">
        <h3>First Name: </h3>
        <p>{profile.firstName ? profile.firstName : "No Data"}</p>
        <h3>Last Name: </h3>
        <p>{profile.lastName ? profile.lastName : "No Data"}</p>
        <h3>Phone: </h3>
        <p>{profile.phone ? profile.phone : "No Data"}</p>
        <h3>Country: </h3>
        <p>{profile.country ? profile.country : "No Data"}</p>
        <h3>Town: </h3>
        <p>{profile.town ? profile.town : "No Data"}</p>
        <button onClick={() => handlePopUp()}>Edit</button>
      </div>
      <ProfileUpdate
        trigger={popUpStatus}
        profile={profile}
        setPopUpStatus={setPopUpStatus}
        setMessage={setMessage}
        setProfile={setProfile}
      />
    </div>
  );
};

export default Profile;
