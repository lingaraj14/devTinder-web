import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("lingaraj@gmail.com");
  const [password, setPassword] = useState("Lingaraj@1234");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setisLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggelForm = () => {
    setisLogin(!isLogin);
  };

  const handleClick = () => (isLogin ? handleLogin() : handleSignup());

  const handleLogin = async () => {
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

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
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
          <legend className="fieldset-legend">
            {isLogin ? "Login" : "Signup"}
          </legend>

          {!isLogin && (
            <>
              <label className="label">First Name</label>
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
            </>
          )}

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
            {isLogin ? "Login" : "Signup"}
          </button>
          <p className="m-auto">
            {isLogin ? (
              <>
                New user?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={toggelForm}
                >
                  Signup here
                </span>
              </>
            ) : (
              <>
                Existing user?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={toggelForm}
                >
                  Login here
                </span>
              </>
            )}
          </p>
        </fieldset>
      </div>
    </>
  );
};

export default Login;
