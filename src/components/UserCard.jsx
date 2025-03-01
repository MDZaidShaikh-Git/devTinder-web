import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {

    const dispatch = useDispatch();
    console.log("User",user) 
    const{_id, firstName, lastName, photoUrl, age, gender, about, skills} = user;
  
    const handleSendRequest = async(status, userId)=>{
      try {
        const response = await axios.post(BASE_URL+"/request/send/"+ status + "/" + userId,{},{withCredentials:true});
        dispatch(removeUserFromFeed(userId)) 
      } catch (error) {
        console.log("Error sending request: ",error)
      }
    }
  
    return (
      <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={user.photoUrl}
          alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName+" "+lastName}</h2>
        <p>{about}</p>
        {age && gender && <p>{"Age = "+age+" years"+" , "+"Gender = "+gender}</p>}
        {/* //<p>{skills.join(',')}</p> */}

        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary" onClick={()=> handleSendRequest("ignored", _id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={()=> handleSendRequest("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  )
}

export default UserCard