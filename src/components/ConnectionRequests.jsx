/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import CardList from "./CardList";
import {
  addConnectionRequestList,
  removeConnectionRequestList,
} from "../store/connectionRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateConnectionList } from "../store/connectionSlice";

const ConnectionRequests = () => {
  const connectionRequests = useSelector(
    (store) => store.appReducer.connectionRequest,
  );
  const dispatch = useDispatch();
  const fetchConnectRequests = async () => {
    if (connectionRequests.length > 0) return;
    try {
      const response = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      //console.log(response);
      dispatch(addConnectionRequestList(response.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = async (requestId, status) => {
    try {
      const response = await axios.post(
        BASE_URL + "/connection/review/" + status + "/" + requestId,
        {},
        { withCredentials: true },
      );
      if (response) {
        status === "accepted" && updateConnectionStore(requestId); //update the connection store, after accepting the request
        dispatch(removeConnectionRequestList(requestId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateConnectionStore = (requestId) => {
    const connectionReqItem = connectionRequests.filter(
      (item) => item._id.toString() === requestId,
    );
    /* console.log(
      "connectionReqItem.fromUserId: ",
      connectionReqItem[0].fromUserId,
    ); */
    dispatch(updateConnectionList(connectionReqItem[0].fromUserId));
  };

  useEffect(() => {
    fetchConnectRequests();
  }, []);

  return (
    <>
      <div className="flex justify-center my-5">
        {!connectionRequests || connectionRequests.length === 0 ? (
          <p>
            You don't have any connection request! Please send new{" "}
            <Link to="/">
              <span className="text-blue-600">connection request</span>
            </Link>
          </p>
        ) : (
          <h1 className="font-bold text-2xl">Connection Requests</h1>
        )}
      </div>
      {connectionRequests &&
        connectionRequests.map((item) => (
          <CardList
            key={item._id}
            user={item.fromUserId}
            isRequest={true}
            reviewRequest={reviewRequest}
            requestId={item._id}
          />
        ))}
    </>
  );
};

export default ConnectionRequests;
