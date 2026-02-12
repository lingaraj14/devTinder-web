import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("lingaraj@gmail.com");
  const [password, setPassword] = useState("Lingaraj@1234");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(response.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message);
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-center text-red-700 text-sm">{error}</p>}
          <button className="btn btn-neutral mt-4" onClick={handleClick}>
            Login
          </button>
        </fieldset>
      </div>
    </>
  );
};

export default Login;
