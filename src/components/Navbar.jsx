import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {

  const user = useSelector((store)=> store.user);
  console.log(user);

 return(
<div className="navbar bg-base-300" data-theme="dark">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevSaathi</Link>
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
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>)}
</div>
 )
}

export default Navbar;