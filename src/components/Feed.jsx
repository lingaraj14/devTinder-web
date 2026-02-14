/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import axios from "axios";
import UserCard from "./userCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const feeds = useSelector((store) => store.appReducer.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchFeeds = async () => {
    if (feeds.length > 0) return;
    try {
      const response = await axios.get(BASE_URL + "/user/feeds", {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.data));
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/login");
      }
      console.error(err.response);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <>
      {feeds.length > 0 ? (
        <UserCard user={feeds[0]} />
      ) : (
        <h2 className="text-center pt-5">No new user available!</h2>
      )}
    </>
  );
};

export default Feed;
