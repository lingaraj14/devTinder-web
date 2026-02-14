import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
/* import { removeUser } from "../store/userSlice";
import { removeFeed } from "../store/feedSlice";
import { clearConnectionRequestList } from "../store/connectionRequestSlice";
import { removeConnectionList } from "../store/connectionSlice"; */
import { logout } from "../store/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.appReducer.user);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      /* dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(clearConnectionRequestList());
      dispatch(removeConnectionList()); */
      dispatch(logout()); //For a single call, all state data(user, feed, etc.) clear
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            devTinder
          </Link>
        </div>
        {user && (
          <div className="flex gap-2">
            <div className="flex-1">
              <span>Welcome, {user.firstName}</span>
            </div>
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="Photo" src={user.photopath} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/connections">My Connections</Link>
                </li>
                <li>
                  <Link to="/connection-requests">Connection requests</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
