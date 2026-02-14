import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName ?? "");
  const [age, setAge] = useState(user?.age ?? "");
  const [gender, setGender] = useState(user?.gender ?? "");
  const [about, setAbout] = useState(user?.about ?? "");
  const [photopath, setPhotopath] = useState(user?.photopath ?? "");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photopath,
        },
        { withCredentials: true },
      );
      dispatch(addUser(response?.data?.data));
      setSuccessMsg(response?.data?.message);
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    } catch (err) {
      if (err.response.data) {
        setError(err.response.data.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      console.error(err.response);
    }
  };

  return (
    <>
      {error && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>{successMsg}</span>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-5 my-2">
          <legend className="fieldset-legend">Edit Profile</legend>

          <label className="label">First Name</label>
          <p>Fname: {firstName}</p>
          <input
            type="text"
            className="input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            className="input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className="label">Age</label>
          <input
            type="number"
            className="input"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label className="label">Gender</label>
          <input
            type="text"
            className="input"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <label className="label">About</label>
          <textarea
            className="textarea"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
          <label className="label">Photo Path</label>
          <input
            type="text"
            className="input"
            placeholder="photo Path"
            value={photopath}
            onChange={(e) => setPhotopath(e.target.value)}
          />
          <button className="btn btn-neutral mt-4" onClick={handleClick}>
            Update Profile
          </button>
        </fieldset>
        <div>
          <UserCard
            user={{ firstName, lastName, age, gender, about, photopath }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
