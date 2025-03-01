import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {

  const user = useSelector((store)=> store.user);
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout =async()=>{
       try {
        await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
        dispatch(removeUser());
        navigate("/login")
       } catch (error) {
        console.log(error)
       }
    }

 return(
<div className="navbar bg-base-300" data-theme="dark">
  <div className="flex-1">
    <Link to="/feed" className="btn btn-ghost text-xl">DevSaathi</Link>
  </div>
  {user && (<div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <p className="p-3">Welcome, {user.firstName}</p>
    <div className="dropdown dropdown-end flex">
  
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests Received</Link></li>
        <li onClick={handleLogout}><a>Logout</a></li>
      </ul>
    </div>
  </div>)}
</div>
 )
}

export default Navbar;