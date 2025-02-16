import React from 'react'
import { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import UserCard from './UserCard';
import axios from 'axios';

const EditProfile = ({user}) => {
    console.log("User",user)
      const[firstName, setFirstName] = useState(user.firstName);
      const[lastName, setLastName] = useState(user.lastName);
      const[age, setAge]= useState(user.age);
      const[gender, setGender]= useState(user.gender);
      const[about, setAbout]= useState(user.about);
      const[photoUrl, setPhotoUrl]= useState(user.photoUrl);
      const[error, setError] = useState("");  

      const dispatch = useDispatch();

      const saveProfile = async()=>{
        //clearing off the errors
        setError("")
        try {
            const res = await axios.patch(BASE_URL+"/profile/edit",
                {
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                },{withCredentials:true}
            );
            dispatch(addUser(res.data))
        } catch (error) {
          setError(error?.response?.data || "Something went wrong")
        }
      }

      return (
        <div className="flex items-center justify-center p-4">
        <div className="card bg-base-300 w-96 shadow-xl " data-theme="dark">
        <div className="card-body items-center text-center">
            <h2 className="card-title">Edit Profile</h2>

            <div className="space-y-4">

            <label className="form-control w-full max-w-xs my-4">
            <div className="label">
                <span className="label-text">First Name</span>
            </div>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
            />
            </label>

            <label className="form-control w-full max-w-xs my-4">
            <div className="label">
                <span className="label-text">Last Name</span>
            </div>
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
            />
            </label>

            <label className="form-control w-full max-w-xs my-4">
            <div className="label">
                <span className="label-text">Age</span>
            </div>
            <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full max-w-xs"
            />
            </label>

            <label className="form-control w-full max-w-xs my-4">
            <div className="label">
                <span className="label-text">Gender</span>
            </div>
            <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input input-bordered w-full max-w-xs"
            />
            </label>

            <label className="form-control w-full max-w-xs my-4">
            <div className="label">
                <span className="label-text">Photo Url</span>
            </div>
            <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input input-bordered w-full max-w-xs"
            />
            </label>

            <label className="form-control w-full max-w-xs my-4">
            <div className="label">
                <span className="label-text">About</span>
            </div>
            <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="input input-bordered w-full max-w-xs"
            />
            </label>

            </div>

            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={saveProfile} >Save Profile</button>
            </div>
        </div>
        </div>
        <UserCard user={{firstName, lastName, photoUrl, age, gender, about}}/>
    </div>
  )
}

export default EditProfile