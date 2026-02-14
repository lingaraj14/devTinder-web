import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../store/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleFeedUsers = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/connection/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="flex justify-center my-5">
        <div className="card bg-base-300 w-65 shadow-sm">
          <figure>
            <img src={user?.photopath} alt="Photo" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {user?.firstName + " " + user?.lastName}
            </h2>
            {user.gender && user.age && (
              <h5 className="text-xs mt-0">
                {user.gender + ",  Age:" + user.age}
              </h5>
            )}
            <p>{user?.about}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-soft btn-primary"
                onClick={() => handleFeedUsers("ignored", user._id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-soft btn-secondary"
                onClick={() => handleFeedUsers("interested", user._id)}
              >
                Interest
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
