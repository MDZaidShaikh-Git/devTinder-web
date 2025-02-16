import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";

const Feed = () => {

  const feed = useSelector((store)=>store.feed)
  console.log("Feed",feed)
  const dispatch = useDispatch();

  const getFeed = async()=>{
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL+"/feed",{withCredentials:true})
      console.log("res",res)
      dispatch(addFeed(res.data))
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=>{
    getFeed()
  },[])

  return feed && <div className="flex justify-center my-10"><UserCard user={feed[0]}/></div>;
};

export default Feed;
