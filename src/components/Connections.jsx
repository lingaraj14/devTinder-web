/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionList } from "../store/connectionSlice";
import CardList from "./CardList";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.appReducer.connection);
  const fetchConnections = async () => {
    if (connections.length > 0) return;
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnectionList(response.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  //console.log("connections: ", connections);

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <>
      <div className="flex justify-center my-5">
        {!connections || connections.length === 0 ? (
          <p>
            You don't have any connections! Please send new{" "}
            <Link to="/">
              <span className="text-blue-600">connection request</span>
            </Link>
          </p>
        ) : (
          <h1 className="font-bold text-2xl">connections</h1>
        )}
      </div>
      {connections &&
        connections.map((item) => <CardList key={item._id} user={item} />)}
    </>
  );
};

export default Connections;
